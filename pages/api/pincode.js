// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import Cors from 'cors'
import initMiddleware from './lib/mid'
const cors = initMiddleware(
  Cors({
    methods:['GET','POST','OPTIONS']
  })
)

export default async function handler(req, res) {
  await cors(req,res)
  const pincodes = {
    "122018":["Haryana","Gurugram"],
    "110001":["Delhi","Delhi"],
    "110002":["Delhi","Delhi"],
    "110003":["Delhi","Delhi"],
    "110004":["Delhi","Delhi"],
    "110005":["Delhi","Delhi"],
    "110006":["Delhi","Delhi"],
    "110007":["Delhi","Delhi"],
    "110006":["Delhi","Delhi"],
    "110009":["Delhi","Delhi"],
    "133301":["Punjab","Chandigarh"],
    }
  const pincode = JSON.parse(req.body)
  const results = pincodes[pincode]
  try{
    res.status(200).json({"city":results[1],'state':results[0]})
  }
  catch{
    res.status(200).json({"city":"unserviceable",'state':"unservicable"})

  }
  }
  