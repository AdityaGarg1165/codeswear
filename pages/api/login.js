const mongo = require('mongoose')
const User = require('./User')
const CryptoJS = require("crypto-js")
export default async function handler(req, res) {
  const data = JSON.parse(req.body)
  const user = await User.findOne({"email":data['formemail']})
  if(req.method = "POST"){
      
      if(user){
        if(user.email === data.formemail && data.formpassword === CryptoJS.AES.decrypt(user.password,'khotakhota').toString(CryptoJS.enc.Utf8)){
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
  }
