import React from 'react'
import Script from 'next/script'
export default function transaction() {

    const initiate = ()=>{
        const pay = new window.Razorpay(options)
        pay.open()
    }
    return (
        <div>
       
        <button onClick={initiate}>Pay</button>
    </div>
  )
}
