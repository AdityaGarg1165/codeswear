// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default async function handler(req, res) {
  // if(req.method === 'POST'){

    const https = require('https');
    /*
    * import checksum generation utility
    * You can get this utility from https://developer.paytm.com/docs/checksum/
    */
   const PaytmChecksum = require('paytmchecksum');
   var paytmParams = {};
   const mid = "eRMJIk88687155228380"
   paytmParams.body = {
     "requestType"   : "Payment",
     "mid"           : mid,
     "websiteName"   : "codeswear",
     "orderId"       : JSON.parse(req.body).oid,
     "callbackUrl"   : "http://codeswear-rho.vercel.app",
     "txnAmount"     : {
       "value" : JSON.parse(req.body).sub,
       "currency"  : "INR",
      },
      "userInfo"      : {
        "custId"    : "CUST_001",
      },
    };

    /*
    * Generate checksum by parameters we have in body
    * Find your Merchant Key in your Paytm Dashboard at https://dashboard.paytm.com/next/apikeys 
    */
   const checksum = await PaytmChecksum.generateSignature(JSON.stringify(paytmParams.body), "mZSoDbsM0%o_jy%q")
   
   paytmParams.head = {
     "signature"    : checksum
    };
    
    var post_data = JSON.stringify(paytmParams);
    
    const requestas = ()=>{
      return new Promise((reso,rej)=>{
        
        
        
        var options = {
          
          /* for Staging */
          hostname: 'securegw-stage.paytm.in',
          
          /* for Production */
          // hostname: 'securegw.paytm.in',
          
          port: 443,
          path: `/theia/api/v1/initiateTransaction?mid=${mid}&orderId=${JSON.parse(req.body).oid}`,
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Content-Length': post_data.length
          }
        };
        
        var response = "";
        var post_req = https.request(options, function(post_res) {
          post_res.on('data', function (chunk) {
            response += chunk;
          });
          
          post_res.on('end', function(){
          // console.log('Response: ', response);
          reso(response)
        });
      });
      
      post_req.write(post_data);
      post_req.end();
    })
  }
  const myr = await requestas();
  res.status(200).json(JSON.parse(myr).body)
}
  
// }
