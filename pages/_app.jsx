import '../styles/globals.css'
import Topload from './toploader'
import Navbar from './navbar'
// import Footer from './footer'
import LoadingBar from 'react-top-loading-bar'
import { useState,useEffect } from 'react'
import { useRouter } from 'next/router'

function MyApp({ Component, pageProps }) {
  const [up,sp] = useState('')
  let [arr,setarr] = useState('')
  const [progress,setProgress] = useState(0)
  const [top,uptop]= useState('')
  const [cdat,setc] = useState([])
  const [time,settime] = useState('')
  const [cartupdate,setup] = useState([])
  const cartdata = []
  const router = useRouter()
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
  useEffect(()=>{
    router.events.on('routeChangeComplete',()=>{
      setProgress(100)
    },[])
  },[])
  return <>
    <Navbar subtotal={subtotal} update={setup} cdat={cdat}/>
   <LoadingBar
        color='#4f46e5'
        progress={progress}
        waitingTime={300}
        onLoaderFinished={() => setProgress(0)}
      />
  {/* <Topload animation={top} /> */}
  <Component updateT={uptop} time={settime} update={setup}{...pageProps} />
  {/* <Footer></Footer> */}
  </>
}

export default MyApp
