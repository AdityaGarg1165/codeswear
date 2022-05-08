import '../styles/globals.css'
import Navbar from './navbar'
import Footer from './footer'
import { useState,useEffect } from 'react'

function MyApp({ Component, pageProps }) {
  const [up,sp] = useState('')
  let [arr,setarr] = useState('')
  const [cdat,setc] = useState([])
  const [cartupdate,setup] = useState([])
  const cartdata = []
  const pricedata = []
  let [subtotal,settot] = useState(0);
  useEffect(()=>{
    // localStorage.setItem('price',"0")
    try{
      
      const existingitems = localStorage.getItem('cart')
      const splited = existingitems.split(',')
      const existingprice = localStorage.getItem('price')
      if(existingprice === NaN){

        settot('0')
      }
      settot(existingprice)
      splited.map((item)=>{
        
        cartdata.push(item)
      })
      setc(cartdata)
    }
    catch{
      const existingitems = localStorage.getItem('cart')
      const existingp = localStorage.getItem('price')
      cartdata.push(existingitems)
      settot(existingp)
      
    }
    setc(cartdata)
  },[arr,cartupdate])
  return <>
  <Navbar subtotal={subtotal} update={setup} cdat={cdat}/>
  <Component update={setup}{...pageProps} />
  <Footer></Footer>
  </>
}

export default MyApp
