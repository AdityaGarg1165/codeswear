import React from 'react'
import {AiOutlineShoppingCart} from 'react-icons/ai'
import {AiFillCloseCircle} from 'react-icons/ai'
import Link from 'next/link'
import { useEffect,useState,useRef } from 'react'
import Router from 'next/router'
import Image from 'next/image'
const jwt = require('jsonwebtoken')

export default function Navbar() {
  let [arr,setarr] = useState('')
  const [cdat,setc] = useState([])
  const cartdata = []
  const pricedata = []
  let [subtotal,settot] = useState(0);
  useEffect(()=>{
    // localStorage.setItem('price',"0")
    try{
      
      const existingitems = localStorage.getItem('cart')
      const splited = existingitems.split(',')
      const existingprice = localStorage.getItem('price')
      settot(existingprice)
      splited.map((item)=>{
        
        cartdata.push(item)
      })
      setc(cartdata)
    }
    catch{
      const existingitems = localStorage.getItem('cart')
      cartdata.push(existingitems)
      
    }
    setc(cartdata)
  },[arr])
  const [name,set] = useState(null)
  const cartref = useRef()
  useEffect(()=>{toggle()},[])
  const toggle = () => {
    if(cartref.current.classList.contains('translate-x-full')){
      cartref.current.classList.remove('translate-x-full')
      cartref.current.classList.remove('hidden')
      
      setarr(Math.random().toString())
    }
    
    
    
  }
  const cross = () => {
    cartref.current.classList.add('translate-x-full')
    cartref.current.classList.add('hidden')
    setarr(Math.random().toString())
  }
  const handleclick = () =>{
    if(name === null){
      Router.push("/login")
    }
    else{
      localStorage.removeItem('jwt')
      set(null)
    }
    
  }
  useEffect(()=>{
    try{
      
      const token = localStorage.getItem('jwt')
      const data = jwt.decode(token)
      const email = data.email
      set(email.split('@')[0])
    }
    catch{
      
    }
  },[])
  return (
    <header id='' className="text-black bg-white shadow-xl body-font">
    <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <Link href={'/'}>
      <a className="flex title-font font-small items-center text-white mb-4 md:mb-0">
        <Image src={'/logo1.png'} width="200" height="70"></Image>
      </a>
        </Link>
      <nav className="md:ml-8 flex flex-wrap items-center text-base justify-center">
        <Link href = {'/Tshirts'}><a className="mr-5 hover:fill-indigo-600 font-bold cursor-pointer">Tshirt</a></Link>
        <Link href = {'/Hoodies'}><a className="mr-5 hover:fill-indigo-600 font-bold cursor-pointer">Hoodies</a></Link>
        <Link href = {'/Mugs'}><a className="mr-5 hover:fill-indigo-600 font-bold cursor-pointer">Mugs</a></Link>
        <Link href = {'/Shoes'}><a className="mr-5 hover:fill-indigo-600 font-bold cursor-pointer">Shoes</a></Link>
        <Link href = {'/about'}><a className="mr-5 hover:fill-indigo-600 font-bold cursor-pointer">About us</a></Link>

        {/* <a className="mr-5 ml-auto hover:fill-indigo-600 font-bold cursor-pointer">{name ? 'Welcome' + ' ' + '@' + name : null}</a> */}
      </nav>
      <button onClick={handleclick} className="inline-flex ml-auto items-center border-0 py-1 px-3 focus:outline-none bg-indigo-600 mx-12 rounded text-white mt-4 md:mt-0">{name ? 'Logout' : 'Login'}
        <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 ml-1" viewBox="0 0 24 24">
          <path d="M5 12h14M12 5l7 7-7 7"></path>
        </svg>
      </button>
      <AiOutlineShoppingCart onClick={toggle} className='text-3xl cursor-pointer -mt-8 md:mt-0' />
      <div ref={cartref} className="cart transition-transform translate-x-full transform bg-indigo-300 absolute top-0 right-0 p-10">
        <h2 className='font-bold text-xl'>Shopping Cart</h2>
        <span className='absolute top-2 right-2'><AiFillCloseCircle onClick={cross} className='cursor-pointer' size={20}/></span>
        <ol>
          {cdat && cdat.map((item)=>(
            
            <li key={'item.id'}>
              <span>{item}</span>
          </li>
            ))}
            <h1 className='font-bold'>Subtotal:{subtotal}</h1>
            <Link href={'/checkout'}>
            <button className='bg-indigo-600 rounded-sm text-white w-28 h-8'>Checkout</button>
            </Link>
        </ol>
      </div>
    </div>
  </header>
  )
}
