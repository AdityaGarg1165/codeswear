import React, { useRef, useState } from 'react'
import Script from 'next/script'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Link from 'next/link'
import { useEffect } from 'react'



const Checkout = () => {
    const ref = useRef()
    const [payload,setpayload] = useState(undefined)
    const [city,setcit] = useState(undefined)
    const [sub,setsub] = useState(0)
    const [address,setaddress] = useState(undefined)
    const [email,setemail] = useState(undefined)
    const [phone,setphone] = useState(undefined)
    const [name,setname] = useState(undefined)
    const [state,setstat] = useState(undefined)
    useEffect(()=>{
        setsub(localStorage.getItem('price'))
    },[])
    const initiate = ()=>{

    }
    
    const pincode = async()=>{
        const value = ref.current.value
        if(value.length === 6){
            const post = await fetch("/api/pincode",{method:"post",body:JSON.stringify(value)})
            const res = await post.json()
            console.log(res)
            setcit(res["city"])
            setstat(res["state"])
        }

    }

    return (
        <>
        <ToastContainer
      position="top-left"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      />
        <div className="container m-auto">
            
           
            <h1 className="font-bold text-3xl my-8 text-center">Checkout</h1>
            <h2 className="font-semibold text-xl">1. Delivery Details</h2>
                <form method='POST' onSubmit={async(e)=>{
                    e.preventDefault()
                    if(state && name && address && city && state && phone && email){
                        if(sub!=null){
                            setpayload("Loading")

                            
                            const oid = Math.floor(Math.random() * Date.now())
                            const fet = await  fetch("/api/transaction",{method:"POST",body:JSON.stringify({"oid":oid,"sub":sub})})
                            const json = await fet.json()
                            console.log(json.txnToken)
                            var config = {
                                "root": "",
                                "flow": "DEFAULT",
                                "data": {
                                    "orderId": oid, /* update order id */
                                    "token": json.txnToken, /* update token value */
                                    "tokenType": "TXN_TOKEN",
                                    "amount": "1" /* update amount */
                                },
                                "handler": {
                                    "notifyMerchant": function(eventName,data){
                                        console.log("notifyMerchant handler function called");
                                        console.log("eventName => ",eventName);
                                        console.log("data => ",data);
                                        if(data === 'App closed from the header icon'){
                                            setpayload(undefined)
                                        }
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
                        }
                            else{
                                toast.error("Please fill out all the fields", {
                                    position: "top-left",
                                    autoClose: 5000,
                                    hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                      });
                      
                    
                }
                }} action="">
            <div className="mx-12 flex my-4">
                <div className="px-2 w-1/2">
                    <div className=" mb-4">
                        <label htmlFor="name" className="leading-7 text-sm text-gray-600">Name</label>
                        <input type="text" id="name" name="name" value={name} onChange={(E)=>{setname(E.target.value)}} className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                    </div>
                </div>
                <div className="px-2 w-1/2">
                    <div className=" mb-4">
                        <label htmlFor="email" className="leading-7 text-sm text-gray-600">Email</label>
                        <input type="email" id="email" name="email" value={email} onChange={(E)=>{setemail(E.target.value)}} className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                    </div>
                </div>

            </div>
            <Script crossOrigin='anonymous' src={`https://securegw-stage.paytm.in/merchantpgpui/checkoutjs/merchants/eRMJIk88687155228380.js`}></Script>
                <div className=" mb-4 ml-12">
                    <label htmlFor="address" className="leading-7 text-sm text-gray-600">Address</label>

                    <textarea name="address" id="address" cols="30" rows="2" value={address} onChange={(E)=>{setaddress(E.target.value)}} className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"></textarea>
                </div>
                <div className="mx-12 flex my-4">
                <div className="px-2 w-1/2">
                    <div className=" mb-4">
                        <label htmlFor="phone" className="leading-7 text-sm text-gray-600">Phone</label>
                        <input type="text" id="phone" name="phone" value={phone} onChange={(E)=>{setphone(E.target.value)}} className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                    </div>
                </div>
                <div className="px-2 w-1/2">
                    <div className=" mb-4">
                        <label htmlFor="city" className="leading-7 text-sm text-gray-600">City</label>
                        <input id="city" value={city} name="city" onChange={(E)=>{setcit(E.target.value)}} className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                    </div>
                </div>

            </div> 
            <div className="mx-12 flex my-4">
                <div className="px-2 w-1/2">
                    <div className=" mb-4">
                        <label htmlFor="state" className="leading-7 text-sm text-gray-600">State</label>
                        <input type="text" value={state} onChange={(E)=>{setstat(E.target.value)}} id="state" name="state" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                    </div>
                </div>
                <div className="px-2 w-1/2">
                    <div className=" mb-4">
                        <label htmlFor="pincode" className="leading-7 text-sm text-gray-600">Pincode</label>
                        <input ref={ref} onChange={pincode} id="pincode" name="pincode" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                    </div>
                </div>

            </div>  
            <h1 className='ml-18 -mt-6 pt-2 p-4'>{payload?"Loading paytm payment gateway...":null}</h1>
            <button className="flex ml-auto ml-16 text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded" onClick={initiate}>{'Pay' + ' ' + '₹' + sub}</button>
            </form>
            </div>
            </>


    )
}
export default Checkout