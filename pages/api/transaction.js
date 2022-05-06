// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
export default async function handler(req, res) {
  let data = req.body
  if(req.method === "POST"){
    const https = require('https');
    /*
    * import checksum generation utility
    * You can get this utility from https://developer.paytm.com/docs/checksum/
    */
    const PaytmChecksum = require('paytmchecksum');
    
    var paytmParams = {};
    
    paytmParams.body = {
        "requestType"   : "Payment",
        "mid"           : process.env.NEXT_PUBLIC_PAYTM_MID,
        "websiteName"   : "Codeswear",
        "orderId"       : req.body.oid,
        "callbackUrl"   : `${process.env.NEXT_PUBLIC_HOST}/api/posttrans`,
        "txnAmount"     : {
            "value"     : req.body.subtotal,
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
   const checksum = await PaytmChecksum.generateSignature(JSON.stringify(paytmParams.body), process.env.NEXT_PUBLIC_PAYTM_KEY)
     
     paytmParams.head = {
       "signature"    : checksum
      };
      
      var post_data = JSON.stringify(paytmParams);
      const requestAsync = ()=>{
        return new Promise((resp,rej)=>{
          
          var options = {
            
            /* for Staging */
            hostname: 'securegw-stage.paytm.in',
            
            /* for Production */
            // hostname: 'securegw.paytm.in',
        
                port: 443,
                path: `/theia/api/v1/initiateTransaction?mid=GFXSpe96890683361113&orderId=${req.body.oid}`,
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
                    console.log('Response: ', response);
                    resp(response)
                });
            });
        
            post_req.write(post_data);
            post_req.end();
          
        })
      }

      let myres = await requestAsync();
      res.status(200).json(myres)
    
    

  }
}