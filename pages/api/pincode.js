// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
  const pincodes = {
    "122018":["Haryana","Gurugram"]
    }
  console.log(pincodes)
  const pincode = req.body.pincode
  const results = pincodes[pincode]
    res.status(200).json({"city":results[1],'state':results[0]})
  }
  