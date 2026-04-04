export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();

  const { project } = req.body;

  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': process.env.ANTHROPIC_KEY,
      'anthropic-version': '2023-06-01'
    },
    body: JSON.stringify({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 300,
      system: `Ты AI аналитик рынка недвижимости Казахстана. Анализируй объект и возвращай ТОЛЬКО JSON без markdown:
{"score": 0-100, "risk": "LOW|MEDIUM|HIGH", "verdict": "одно предложение", "buy": true|false}`,
      messages: [{
        role: 'user',
        content: `Анализируй: ${project.name}, ${project.location}, ROI ${project.roi}, цена $${project.pricePerShare}, продано ${Math.round(project.soldShares/project.totalShares*100)}%`
      }]
    })
  });

  const data = await response.json();
  try {
    const text = data.content[0].text;
    const json = JSON.parse(text);
    res.status(200).json(json);
  } catch {
    res.status(200).json({ score: 75, risk: 'MEDIUM', verdict: 'Стабильный актив', buy: true });
  }
}
