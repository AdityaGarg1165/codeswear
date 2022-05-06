import React, { useRef, useState } from 'react'
import Script from 'next/script'
import Link from 'next/link'
import { useEffect } from 'react'


const Checkout = () => {
    const ref = useRef()
    const [city,setcit] = useState('')
    const [sub,setsub] = useState('')
    const [state,setstat] = useState('')
    useEffect(()=>{
        setsub(localStorage.getItem('price'))
    },[])
    const initiate = ()=>{
        var options = {
            "key": "rzp_live_dGbruH5EDyqumR", // Enter the Key ID generated from the Dashboard
            "amount": localStorage.getItem("price") * 100, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
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
    
    const pincode = async()=>{
        const value = ref.current.value
        if(value.length === 6){
            const post = await fetch("http://localhost:3000/api/pincode",{method:"post",body:JSON.stringify(value)})
            const res = await post.json()
            console.log(res)
            setcit(res["city"])
            setstat(res["state"])
        }

    }

    return (
        <>
        <Script crossOrigin='' src='https://checkout.razorpay.com/v1/checkout.js'></Script>
        <div className="container m-auto">
           
            <h1 className="font-bold text-3xl my-8 text-center">Checkout</h1>
            <h2 className="font-semibold text-xl">1. Delivery Details</h2>
                <form action="">
            <div className="mx-12 flex my-4">
                <div className="px-2 w-1/2">
                    <div className=" mb-4">
                        <label htmlFor="name" className="leading-7 text-sm text-gray-600">Name</label>
                        <input type="text" id="name" name="name" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                    </div>
                </div>
                <div className="px-2 w-1/2">
                    <div className=" mb-4">
                        <label htmlFor="email" className="leading-7 text-sm text-gray-600">Email</label>
                        <input type="email" id="email" name="email" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                    </div>
                </div>

            </div>
                <div className=" mb-4 ml-12">
                    <label htmlFor="address" className="leading-7 text-sm text-gray-600">Address</label>

                    <textarea name="address" id="address" cols="30" rows="2" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"></textarea>
                </div>
                <div className="mx-12 flex my-4">
                <div className="px-2 w-1/2">
                    <div className=" mb-4">
                        <label htmlFor="phone" className="leading-7 text-sm text-gray-600">Phone</label>
                        <input type="text" id="phone" name="phone" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                    </div>
                </div>
                <div className="px-2 w-1/2">
                    <div className=" mb-4">
                        <label htmlFor="city" className="leading-7 text-sm text-gray-600">City</label>
                        <input id="city" value={city} name="city" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                    </div>
                </div>

            </div> 
            <div className="mx-12 flex my-4">
                <div className="px-2 w-1/2">
                    <div className=" mb-4">
                        <label htmlFor="state" className="leading-7 text-sm text-gray-600">State</label>
                        <input type="text" value={state} id="state" name="state" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                    </div>
                </div>
                <div className="px-2 w-1/2">
                    <div className=" mb-4">
                        <label htmlFor="pincode" className="leading-7 text-sm text-gray-600">Pincode</label>
                        <input ref={ref} onChange={pincode} id="pincode" name="pincode" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                    </div>
                </div>

            </div>  
            <button className="flex ml-auto ml-16 text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded" onClick={initiate}>{'Pay' + ' ' + '₹' + sub}</button>
            </form>
            </div>
            </>


    )
}
export default Checkout