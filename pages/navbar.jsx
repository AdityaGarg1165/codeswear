import React from 'react'
import Link from 'next/link'
import { useEffect,useState } from 'react'
import Router from 'next/router'
const jwt = require('jsonwebtoken')

export default function Navbar() {
  const [name,set] = useState(null)
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
      const email = data.formemail
      set(email.split('@')[0])
    }
    catch{

    }
    },[])
  return (
    <header id='' className="text-black bg-white w-nav shadow-xl body-font">
    <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <Link href={'/'}>
      <a className="flex title-font font-medium items-center text-white mb-4 md:mb-0">
        <span className="ml-3 text-xl text-black ">Codeswear.com</span>
      </a>
        </Link>
      <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
        <a className="mr-5 hover:text-white">Tshirt</a>
        <a className="mr-5 hover:text-white">Mugs</a>
        <a className="mr-5 hover:text-white">Hoodies</a>
        <a className="mr-5 hover:text-white">Stickers</a>
        <a className="mr-5 hover:text-white">{name ? 'Welcome' + ' ' + '@' + name : null}</a>
      </nav>
      <button onClick={handleclick} className="inline-flex items-center border-0 py-1 px-3 focus:outline-none bg-indigo-600 mx-12 rounded text-white mt-4 md:mt-0">{name ? 'Logout' : 'Login'}
        <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-4 h-4 ml-1" viewBox="0 0 24 24">
          <path d="M5 12h14M12 5l7 7-7 7"></path>
        </svg>
      </button>
    </div>
  </header>
  )
}
