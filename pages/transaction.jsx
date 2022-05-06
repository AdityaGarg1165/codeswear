import React from 'react'
import Script from 'next/script'
export default function transaction() {

    const initiate = ()=>{
        var options = {
            "key": "rzp_live_dGbruH5EDyqumR", // Enter the Key ID generated from the Dashboard
            "amount": "50000", // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
            "currency": "INR",
            "name": "Acme Corp",
            "description": "Test Transaction",
            "image": "http://localhost:3000/logo1.png",
            "handler": function (response){
                alert(response.razorpay_payment_id);
                alert(response.razorpay_order_id);
                alert(response.razorpay_signature)
            },
            "prefill": {
                "name": "",
                "email": "",
                "contact": ""
            },
            "notes": {
                "address": ""
            },
            "theme": {
                "color": "#00BAF2"
            }
        };
        const pay = new window.Razorpay(options)
        pay.open()
    }
    return (
        <div>
            <Script crossOrigin='' src='https://checkout.razorpay.com/v1/checkout.js'></Script>
        <button onClick={initiate}>Pay</button>
    </div>
  )
}
