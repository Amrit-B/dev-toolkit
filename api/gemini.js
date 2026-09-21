export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { prompt } = req.body || {};
    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is missing in request body' });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ error: 'Environment variable GEMINI_API_KEY is not set in Vercel' });
    }

    const apiResponse = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }]
      })
    });

    const data = await apiResponse.json();

    // If Google rejects it, pass the exact Google error message through
    if (!apiResponse.ok) {
      return res.status(apiResponse.status).json({ 
        error: `Google API Error (${apiResponse.status}): ${data.error?.message || JSON.stringify(data)}` 
      });
    }

    return res.status(200).json(data);

  } catch (error) {
    // This catches code crashes and returns the exact stack message
    return res.status(500).json({ error: `Server Crash Exception: ${error.message}` });
  }
}
