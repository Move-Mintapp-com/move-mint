/* POST /api/waitlist  ->  adds an address to the Mailchimp audience.
 *
 * Runs on Vercel's Node runtime. It exists because Mailchimp's API cannot be
 * called from a browser: the key would be public and Mailchimp blocks the
 * origin anyway. Everything secret stays in environment variables here.
 *
 * Required environment variables (Vercel -> Settings -> Environment Variables):
 *   MAILCHIMP_API_KEY      e.g. 8f2b...c41-us14   (the -us14 suffix matters)
 *   MAILCHIMP_AUDIENCE_ID  e.g. a1b2c3d4e5        (Audience -> Settings ->
 *                                                  Audience name and defaults)
 * Optional:
 *   MAILCHIMP_STATUS       "subscribed" (default) or "pending" for double
 *                          opt-in, which asks the person to confirm by email.
 *
 * Responses: 200 ok · 422 bad address · 503 not configured · 502 upstream
 */

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'method_not_allowed' });
  }

  // Trimmed: pasting into Vercel very often carries a trailing space or newline.
  const env = (name) => (process.env[name] || '').trim();

  const key = env('MAILCHIMP_API_KEY');
  // Mailchimp calls it an Audience; its API and older docs say List. Accept both.
  const listId = env('MAILCHIMP_AUDIENCE_ID') || env('MAILCHIMP_LIST_ID');
  const status = env('MAILCHIMP_STATUS') || 'subscribed';

  if (!key || !listId) {
    // Say which one is absent. Names only — no values are ever echoed back.
    const missing = [];
    if (!key) missing.push('MAILCHIMP_API_KEY');
    if (!listId) missing.push('MAILCHIMP_AUDIENCE_ID');
    return res.status(503).json({
      error: 'unconfigured',
      missing,
      // Diagnostics: variable NAMES the runtime can actually see, never values.
      // Distinguishes "not injected at all" from "injected under another name".
      seen: Object.keys(process.env).filter((k) => /MAIL|CHIMP/i.test(k)).sort(),
      onVercel: Boolean(process.env.VERCEL),
      vercelEnv: process.env.VERCEL_ENV || null,
      envCount: Object.keys(process.env).length,
      hint: 'Set these in Vercel, then redeploy — variables only apply to builds made after they are added.',
    });
  }

  // The data centre is the suffix of the API key: ...-us14
  const dc = key.split('-')[1];
  if (!dc) {
    return res.status(503).json({
      error: 'malformed_key',
      hint: 'The API key must end in a data-centre suffix such as -us14.',
    });
  }

  let body = req.body;
  if (typeof body === 'string') {
    try { body = JSON.parse(body); } catch { body = {}; }
  }
  const email = String((body && body.email) || '').trim().toLowerCase();
  const source = String((body && body.source) || 'website').slice(0, 80);

  if (!email || email.length > 254 || !EMAIL.test(email)) {
    return res.status(422).json({ error: 'invalid_email' });
  }

  try {
    const upstream = await fetch(
      `https://${dc}.api.mailchimp.com/3.0/lists/${listId}/members`,
      {
        method: 'POST',
        headers: {
          Authorization: 'Basic ' + Buffer.from('key:' + key).toString('base64'),
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email_address: email,
          status,
          tags: ['website-waitlist'],
          merge_fields: { SOURCE: source },
        }),
      },
    );

    if (upstream.ok) return res.status(200).json({ ok: true });

    const detail = await upstream.json().catch(() => ({}));

    // Already on the list is a success from the visitor's point of view.
    if (upstream.status === 400 && detail.title === 'Member Exists') {
      return res.status(200).json({ ok: true, already: true });
    }
    // Mailchimp rejects addresses it believes are fake or previously bounced.
    if (upstream.status === 400) {
      return res.status(422).json({ error: 'rejected', detail: detail.title });
    }

    console.error('mailchimp error', upstream.status, detail.title);
    return res.status(502).json({ error: 'upstream', status: upstream.status });
  } catch (err) {
    console.error('waitlist failed', err && err.message);
    return res.status(502).json({ error: 'upstream' });
  }
};
