export default async function handler(req, res) {
  try {

    const { links } = req.body;

    console.log("收到链接:", links);

    const prompt = `
根据以下商品链接生成商品详情：

${links.join("\n")}
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
        ]
      })
    });

    const data = await response.json();

    console.log("DeepSeek返回:", data);

    res.status(200).json({
      result: JSON.stringify(data)
    });

  } catch (error) {

    console.error("API错误:", error);

    res.status(500).json({
      error: error.message
    });

  }
}
