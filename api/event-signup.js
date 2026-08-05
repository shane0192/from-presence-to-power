module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const body = req.body || {};
  const email = ((body.email) || '').toString().trim().toLowerCase();
  const name  = ((body.name)  || '').toString().trim();
  const phone = ((body.phone) || '').toString().trim();
  const event = ((body.event) || 'unknown').toString().trim();

  if (!email || !/.+@.+\..+/.test(email)) {
    return res.status(400).json({ error: 'Valid email required' });
  }

  const ts = new Date().toISOString();
  const payload = { name, email, phone, event, ts };

  const r = await fetch(`${process.env.KV_REST_API_URL}/lpush`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.KV_REST_API_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify([`event-signups:${event}`, JSON.stringify(payload)]),
  });

  if (!r.ok) {
    console.error('KV error:', await r.text());
    return res.status(500).json({ error: 'Storage error' });
  }

  return res.status(200).json({ ok: true });
};
