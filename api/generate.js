export default async function handler(req, res) {
  try {
    const { links } = req.body;

    const prompt = `
你是一名专业电商运营专家，请根据以下商品链接进行竞品分析，并生成一个完整的商品详情页方案：

商品链接：
${links.join("\n")}

请输出以下内容：

1. 商品标题（适合Amazon或独立站）
2. 5个核心卖点（Bullet Points）
3. 商品详情页文案
4. 定价建议
5. 目标用户人群
`;

    const response = await fetch("https://api.deepseek.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + process.env.DEEPSEEK_API_KEY
      },
      body: JSON.stringify({
        model: "deepseek-chat",
        messages: [
          {
            role: "user",
            content: prompt
          }
        ],
        temperature: 0.7
      })
    });

    const data = await response.json();

    res.status(200).json({
      result: data.choices[0].message.content
    });

  } catch (error) {
    res.status(500).json({
      error: "AI生成失败",
      detail: error.message
    });
  }
}
