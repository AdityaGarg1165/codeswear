// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import * as jsonwebtoken from 'jsonwebtoken';
import * as nodemailer from 'nodemailer'
import {app} from '../firebase'


export default async function handler(req, res) {
    const body = JSON.parse(req.body)
    const token = jsonwebtoken.sign({email:body.email},'khotamridulkey')
    const passwordlink = `http://localhost:3000/forgot/?token=${token}`
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true, // true for 465, false for other ports
      auth: {
        user: 'adityagarg1165', // generated ethereal user
        pass: 'lgpyphvztignofjk', // generated ethereal password
      },
    });
  
    // send mail with defined transport object
    await transporter.sendMail({
      from: '"Codeswear Support" <support@codeswear-rho.vercel.app>', // sender address
      to: body.email, // list of receivers
      subject: "Your password at codeswear-rho.vercel.app", // Subject line
    //   text: "", // plain text body
      html: `<b>We heard that you forgot your password<br>Reset your password at the following link<br>${passwordlink}</b>`, // html body
    });
    res.status(200).json({ name: 'John Doe' })
  }
  