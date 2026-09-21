export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Manually read the raw body stream if Vercel hasn't parsed it yet
    let rawBody = '';
    if (typeof req.body === 'string') {
      rawBody = req.body;
    } else if (req.body) {
      rawBody = JSON.stringify(req.body);
    } else {
      // Fallback for raw Node request streams
      rawBody = await new Promise((resolve) => {
        let data = '';
        req.on('data', chunk => { data += chunk; });
        req.on('end', () => resolve(data));
      });
    }

    const body = rawBody ? JSON.parse(rawBody) : {};
    const prompt = body?.prompt;

    if (!prompt) {
      return res.status(400).json({ error: 'Missing prompt in request body' });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ error: 'GEMINI_API_KEY is not defined in Vercel environment variables.' });
    }

    // Updated to a valid, stable Gemini model endpoint
    const apiResponse = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }]
      })
    });

    const data = await apiResponse.json();

    if (!apiResponse.ok) {
      return res.status(apiResponse.status).json({ 
        error: data.error?.message || 'Upstream Google API error' 
      });
    }

    return res.status(200).json(data);

  } catch (error) {
    return res.status(500).json({ error: `Server execution crash: ${error.message}` });
  }
}
