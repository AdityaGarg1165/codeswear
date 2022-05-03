const mongo = require('mongoose')
const User = require('./User')
const CryptoJS = require("crypto-js")
export default async function handler(req, res) {
  const data = req.body
  console.log(data)
  const user = await User.findOne({"email":data['email']})

      
      if(user){
        if(user.email === data.email && data.password === CryptoJS.AES.decrypt(user.password,'khotakhota').toString(CryptoJS.enc.Utf8)){
          res.status(200).json({"success":true,"message":"Login Succesfull"})
        }
        
        else{
                res.status(200).json({"success":false,"message":"Invalid Credentials"})
                
            }
    }
    else{
            res.status(200).json({"success":false,"message":"Invalid Credentials"})
            
        }
  }
