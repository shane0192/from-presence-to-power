module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });

  const pw = (req.query.pw || '').toString();
  if (!pw || pw !== process.env.ADMIN_PASSWORD) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const KV_URL   = process.env.KV_REST_API_URL;
  const KV_TOKEN = process.env.KV_REST_API_TOKEN;

  if (!KV_URL || !KV_TOKEN) {
    return res.status(500).json({ error: 'KV not configured' });
  }

  // Step 1: find all event-signups keys
  const keysRes = await fetch(`${KV_URL}/pipeline`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${KV_TOKEN}`, 'Content-Type': 'application/json' },
    body: JSON.stringify([['KEYS', 'event-signups:*']]),
  });

  if (!keysRes.ok) {
    return res.status(500).json({ error: 'KV keys lookup failed' });
  }

  const keysData = await keysRes.json();
  const keys = (keysData[0] && keysData[0].result) || [];

  if (keys.length === 0) {
    return res.status(200).json({ events: {} });
  }

  // Step 2: fetch all entries for every key in one pipeline call
  const pipeline = keys.map(k => ['LRANGE', k, '0', '-1']);
  const dataRes = await fetch(`${KV_URL}/pipeline`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${KV_TOKEN}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(pipeline),
  });

  if (!dataRes.ok) {
    return res.status(500).json({ error: 'KV data fetch failed' });
  }

  const dataResults = await dataRes.json();

  // Build response: { events: { "atlanta": [...], ... } }
  const events = {};
  keys.forEach((key, i) => {
    const eventName = key.replace('event-signups:', '');
    const raw = (dataResults[i] && dataResults[i].result) || [];
    events[eventName] = raw.map(entry => {
      try { return JSON.parse(entry); }
      catch { return { raw: entry }; }
    });
  });

  return res.status(200).json({ events });
};
