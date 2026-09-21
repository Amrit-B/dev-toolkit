export default async function handler(req, res) {
  // 1. Force JSON response headers immediately
  res.setHeader('Content-Type', 'application/json');

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : (req.body || {});
    const prompt = body.prompt;

    if (!prompt) {
      return res.status(400).json({ error: 'Missing prompt field' });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ error: 'GEMINI_API_KEY is not defined in Vercel settings' });
    }

    // Using the current active production model
    const googleRes = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-3.8-flash:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }]
      })
    });

    const data = await googleRes.json();

    if (!googleRes.ok) {
      return res.status(googleRes.status).json({ 
        error: data.error?.message || 'Google upstream error' 
      });
    }

    return.status(200).json(data);

  } catch (err) {
    return res.status(500).json({ error: 'Crash: ' + err.message });
  }
}
