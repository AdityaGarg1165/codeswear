export default async function handler(req, res) {
    let data = req.body
    res.json(200).json({body:data})

}