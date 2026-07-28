module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const email = ((req.body && req.body.email) || '').toString().trim().toLowerCase();

  if (!email || !/.+@.+\..+/.test(email)) {
    return res.status(400).json({ error: 'Valid email required' });
  }

  const entry = JSON.stringify({ email, ts: new Date().toISOString() });

  try {
    const r = await fetch(`${process.env.KV_REST_API_URL}/lpush`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.KV_REST_API_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(['appendix-signups', entry]),
    });

    if (!r.ok) throw new Error(await r.text());

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('[appendix-signup]', err.message);
    return res.status(500).json({ error: 'Could not save email' });
  }
};
