import React from 'react'
import Script from 'next/script'
import { useEffect } from 'react'

export default function Pay() {
    const click = async()=>{
        const oid = Math.floor(Math.random() * Date.now())
        const fet = await  fetch("/api/transaction",{method:"POST",body:JSON.stringify({"oid":oid})})
        const json = await fet.json()
        console.log(json.txnToken)
            var config = {
              "root": "",
              "flow": "DEFAULT",
              "data": {
              "orderId": oid, /* update order id */
              "token": json.txnToken, /* update token value */
              "tokenType": "TXN_TOKEN",
              "amount": "1200" /* update amount */
              },
              "handler": {
                "notifyMerchant": function(eventName,data){
                  console.log("notifyMerchant handler function called");
                  console.log("eventName => ",eventName);
                  console.log("data => ",data);
                } 
              }
            };
      
            if(window.Paytm && window.Paytm.CheckoutJS){
                // window.Paytm.CheckoutJS.onLoad(function excecuteAfterCompleteLoad() {
                    // initialze configuration using init method 
                    window.Paytm.CheckoutJS.init(config).then(function onSuccess() {
                        // after successfully updating configuration, invoke JS Checkout
                        window.Paytm.CheckoutJS.invoke();
                    }).catch(function onError(error){
                        console.log("error => ",error);
                    });
            } 
        
    }
  return (
    <div>
        <Script src={"http://securegw-stage.paytm.in/merchantpgpui/checkoutjs/merchants/eRMJIk88687155228380.js"}></Script>
        <button onClick={click}>sdfa</button>
    </div>
  )
}
