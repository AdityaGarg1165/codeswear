// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const mongo = require('mongoose')
const User = require('./User')
const cryptojs = require("crypto-js")
export default async function handler(req, res) {
  let data = req.body
  res.status(200).json({data:"sdsdsdsdsdsdsdsdsdsd"})
    const user = await User.create({
      "email":data["email"],
      "password":cryptojs.AES.encrypt(data["password"],'khotakhota')
    })
    res.status(200).json({message:"Account created successfully"})
    
    
  
  }
