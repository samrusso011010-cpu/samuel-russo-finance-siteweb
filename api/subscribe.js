/* =============================================================================
   INSCRIPTION À L'INFOLETTRE « 1 MINUTE FINANCE » → GoHighLevel
   -----------------------------------------------------------------------------
   Fonction serveur Vercel (Node). Le formulaire du site (assets/js/modules/
   newsletter.js, provider « ghl ») envoie ici { email, lang, website, elapsed }.
   On crée (ou met à jour) le contact dans GoHighLevel avec l'étiquette
   « infolettre » : c'est l'ajout de cette étiquette qui déclenche, côté
   GoHighLevel, le workflow du courriel de bienvenue (déclencheur gratuit
   « Étiquette ajoutée », contrairement au webhook entrant, qui est premium).

   Variables d'environnement à définir dans Vercel (Settings → Environment
   Variables) — JAMAIS dans le code ni dans GitHub :
     GHL_TOKEN        clé « Intégration privée » (permission : contacts.write)
     GHL_LOCATION_ID  identifiant du sous-compte (Location ID)

   La clé reste côté serveur : le navigateur ne la voit jamais.
   ============================================================================= */

'use strict';

// Sites autorisés à appeler cette fonction (contrôle de l'en-tête Origin)
var ALLOWED_ORIGINS = [
  /^https:\/\/(www\.)?samuelrussofinance\.ca$/,
  /^https:\/\/samuel-russo-finance-siteweb[a-z0-9-]*\.vercel\.app$/
];

var GHL_URL = 'https://services.leadconnectorhq.com/contacts/upsert';
var GHL_VERSION = '2021-07-28';
var TAG_MAIN = 'infolettre';

// Limite simple par adresse IP (meilleur effort : la mémoire est propre à chaque instance)
var hits = new Map();
var WINDOW_MS = 10 * 60 * 1000;
var MAX_HITS = 6;

function tooMany(ip) {
  var now = Date.now();
  var arr = (hits.get(ip) || []).filter(function (t) { return now - t < WINDOW_MS; });
  arr.push(now);
  hits.set(ip, arr);
  if (hits.size > 500) hits.clear();
  return arr.length > MAX_HITS;
}

function readBody(req) {
  var b = req.body;
  if (typeof b === 'string') { try { b = JSON.parse(b); } catch (e) { b = null; } }
  return b && typeof b === 'object' ? b : {};
}

module.exports = async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');

  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ ok: false, error: 'method' });
  }

  var origin = String(req.headers.origin || '');
  if (!ALLOWED_ORIGINS.some(function (re) { return re.test(origin); })) {
    return res.status(403).json({ ok: false, error: 'origin' });
  }

  var body = readBody(req);

  // Piège à robots : un champ caché que seul un robot remplit, ou un envoi
  // trop rapide pour un humain. On répond « ok » sans rien enregistrer.
  if (body.website || (typeof body.elapsed === 'number' && body.elapsed < 800)) {
    return res.status(200).json({ ok: true });
  }

  var email = String(body.email || '').trim().toLowerCase();
  if (email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
    return res.status(400).json({ ok: false, error: 'invalid' });
  }

  var ip = String((req.headers['x-forwarded-for'] || '')).split(',')[0].trim() || 'unknown';
  if (tooMany(ip)) {
    return res.status(429).json({ ok: false, error: 'rate' });
  }

  var token = process.env.GHL_TOKEN;
  var locationId = process.env.GHL_LOCATION_ID;
  if (!token || !locationId) {
    return res.status(500).json({ ok: false, error: 'config' });
  }

  var lang = body.lang === 'en' ? 'en' : 'fr';
  var controller = new AbortController();
  var timer = setTimeout(function () { controller.abort(); }, 8000);

  try {
    var r = await fetch(GHL_URL, {
      method: 'POST',
      signal: controller.signal,
      headers: {
        'Authorization': 'Bearer ' + token,
        'Version': GHL_VERSION,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        locationId: locationId,
        email: email,
        source: 'Site web - 1 Minute Finance',
        tags: [TAG_MAIN, 'source-site', 'langue-' + lang]
      })
    });

    if (!r.ok) {
      // On ne journalise jamais l'adresse courriel : seulement le code d'état.
      console.error('GHL upsert failed, status', r.status);
      return res.status(502).json({ ok: false, error: 'upstream' });
    }
    return res.status(200).json({ ok: true });
  } catch (e) {
    console.error('GHL upsert error', e && e.name);
    return res.status(502).json({ ok: false, error: 'upstream' });
  } finally {
    clearTimeout(timer);
  }
};
