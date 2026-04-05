export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();

  const { project } = req.body;

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 200,
        system: `Ты AI аналитик рынка недвижимости Казахстана. Анализируй объект и возвращай ТОЛЬКО JSON без markdown и пояснений:
{"score": число_от_50_до_95, "risk": "LOW или MEDIUM или HIGH", "verdict": "одно короткое предложение на русском", "buy": true или false}

Логика оценки:
- ROI выше 18% = score 85-95, LOW risk
- ROI 13-18% = score 70-84, MEDIUM risk  
- ROI ниже 13% = score 50-69, HIGH risk
- Продано более 80% = добавь 5 к score (популярный объект)
- Продано менее 20% = убавь 5 (низкий спрос)`,
        messages: [{
          role: 'user',
          content: `Объект: ${project.name}, город: ${project.location}, ROI: ${project.roi}, цена доли: $${project.pricePerShare}, продано: ${Math.round(project.soldShares/project.totalShares*100)}%`
        }]
      })
    });

    const data = await response.json();
    const text = data.content[0].text.trim();
    const json = JSON.parse(text);
    res.status(200).json(json);
  } catch(e) {
    // Расчёт на основе данных если API недоступен
    const roiNum = parseFloat(project.roi);
    const soldPct = Math.round(project.soldShares/project.totalShares*100);
    let score = roiNum >= 18 ? 88 : roiNum >= 13 ? 75 : 62;
    if (soldPct > 80) score = Math.min(95, score + 5);
    if (soldPct < 20) score = Math.max(50, score - 5);
    const risk = score >= 80 ? 'LOW' : score >= 65 ? 'MEDIUM' : 'HIGH';
    const buy = score >= 65;
    res.status(200).json({
      score,
      risk,
      verdict: score >= 80 ? 'Высокодоходный актив, рекомендован к покупке' : score >= 65 ? 'Стабильный актив со средним риском' : 'Высокий риск, требует осторожности',
      buy
    });
  }
}
