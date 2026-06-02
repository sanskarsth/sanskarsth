const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_KEY;
const KEEP_ALIVE_SECRET = process.env.KEEP_ALIVE_SECRET;

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ ok: false, error: 'Method not allowed' });
  }

  const incomingSecret = req.headers['x-keep-alive-secret'];
  if (!incomingSecret || incomingSecret !== KEEP_ALIVE_SECRET) {
    return res.status(401).json({ ok: false, error: 'Unauthorized' });
  }

  if (!SUPABASE_URL || !SUPABASE_KEY) {
    return res.status(500).json({ ok: false, error: 'Missing Supabase configuration' });
  }

  try {
    const response = await fetch(
      `${SUPABASE_URL}/rest/v1/keep_alive?select=id&limit=1`,
      {
        method: 'GET',
        headers: {
          apikey: SUPABASE_KEY,
          Authorization: `Bearer ${SUPABASE_KEY}`,
          Accept: 'application/json'
        }
      }
    );

    const payload = await response.json();

    if (!response.ok) {
      return res.status(502).json({
        ok: false,
        error: payload,
        status: response.status
      });
    }

    return res.status(200).json({
      ok: true,
      status: response.status,
      rows: Array.isArray(payload) ? payload.length : null,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    return res.status(502).json({
      ok: false,
      error: error?.message || String(error)
    });
  }
}
