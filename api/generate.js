export default async function handler(req, res) {
  try {

    const { links } = req.body;

    if (!links || links.length === 0) {
      return res.status(400).json({
        error: "没有提供商品链接"
      });
    }

    const prompt = `
你是一名顶级电商运营专家，擅长 Amazon、Shopify 和独立站商品页面优化。

请根据以下竞品商品链接进行分析，并生成一个完整且专业的商品详情页方案。

商品链接：
${links.join("\n")}

请严格按照以下结构输出：

【1. 商品标题】
生成一个高转化率、适合Amazon SEO优化的商品标题。

【2. 核心卖点（Bullet Points）】
生成5个核心卖点，每个卖点突出一个优势。

【3. 商品详细描述】
生成一段不少于200字的商品详情页描述，语言要有销售力。

【4. 产品优势分析】
分析该产品相比普通产品的优势。

【5. 适用人群】
列出适合购买该产品的人群。

【6. 使用场景】
列出该产品适合使用的场景。

【7. 竞品对比优势】
说明该产品相对于竞品的优势。

【8. 图片设计建议】
建议商品详情页需要哪些图片，例如：
- 主图
- 场景图
- 卖点图
- 对比图

【9. 定价建议】
根据竞品分析给出建议售价区间。

【10. 广告营销文案】
生成3条适合广告投放的短文案。
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
            role: "system",
            content: "你是一名资深电商运营专家和营销文案专家"
          },
          {
            role: "user",
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 2000
      })
    });

    const data = await response.json();

    if (!data.choices) {
      return res.status(500).json({
        error: "DeepSeek返回异常",
        detail: data
      });
    }

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
