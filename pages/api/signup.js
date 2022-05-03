// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const mongo = require('mongoose')
const User = require('./User')
const cryptojs = require("crypto-js")
export default async function handler(req, res) {
  let data = JSON.parse(req.body)
  console.log(data)
    const user = await User.create({
      "email":data["formemail"],
      "password":cryptojs.AES.encrypt(data["formpassword"],'khotakhota')
    })
    res.status(200).json({message:"Account created successfully"})
    
    
  
  }
