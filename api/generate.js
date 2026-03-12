export default async function handler(req,res){

const {prompt}=req.body

res.status(200).json({
text:"AI示例结果：\n\n标题：智能无线吸尘器\n卖点：强劲吸力、长续航、轻量化设计\n图片建议：厨房场景+白色配色\n定价建议：39.99美元"
})

}
