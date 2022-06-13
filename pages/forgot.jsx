import { useState,useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link'
import { LockClosedIcon } from '@heroicons/react/solid'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import jsonwebtoken from 'jsonwebtoken';
const jwt = require('jsonwebtoken')
import {app} from './firebase'
import * as CryptoJS from 'crypto-js'
import {useCollectionData} from 'react-firebase-hooks/firestore'
import {addDoc, collection, getFirestore} from 'firebase/firestore'
import Router from 'next/router';

export default function Login() {
  const db = getFirestore(app)
  const [email,setEmail] = useState('')
  const userscollection = collection(db,"users")
  const router = useRouter()
  const [data] = useCollectionData(userscollection)
  const [password,setPassword] = useState('')
  const [useremail,setuseremail] = useState('')
  const [userpassword,setuserpassword] = useState('')
  const token = router.query.token
  useEffect(()=>{
    
    if(token && data){
      const jsondet = jwt.decode(token)
      const user = data.filter(x => x.email === jsondet.email)
      console.log(user)
      const pass = CryptoJS.AES.decrypt(user[0].password,'khotakhota').toString(CryptoJS.enc.Utf8)
      setuserpassword(pass)
      setuseremail(jsondet.email)
      
    }
    },[token,data])
  async function login(e){
    const data = {email:email}
    e.preventDefault()
    const fet = await  fetch("/api/forgot",{method:"POST",body:JSON.stringify(data)})
    // const json = await fet.json()
        
  }
  return (
      <>
      {!token &&
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
      <div className="min-h my-32 -full flex absolute items-center ml-smlogin md:ml-login justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Forgot your password?</h2>
          </div>
          <Link href={'/login'}>
          <p className="mt-2 text-center text-sm text-gray-600">
              Or{' '}
              <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                login to your account
              </a>
            </p>
          </Link>
          <form className="mt-8 space-y-6" action="#" method="POST" onSubmit={login}>
              <div>
                <label htmlFor="password" className="sr-only">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={email}
                  onChange={(e)=>{setEmail(e.target.value)}}
                  autoComplete="current-password"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="email"
                />
              </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                <span className="left-0 inset-y-0 flex items-center pl-3">
                  <LockClosedIcon className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" />
                </span>
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    </>}
    {token && <h1 className='ml-navd mt-96 absolute'>
    Your password and email at codeswear-rho.vercel.app<br/>
    is email - {useremail}<br/>password - {userpassword}
    </h1>}
      </>
  )
}
