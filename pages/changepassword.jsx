import { useState } from 'react';
import Link from 'next/link'
import { LockClosedIcon } from '@heroicons/react/solid'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import jsonwebtoken from 'jsonwebtoken';
const jwt = require('jsonwebtoken')
import {app} from './firebase'
const CryptoJS = require('crypto-js')
import {useCollectionData} from 'react-firebase-hooks/firestore'
import {addDoc, collection, getFirestore,doc, setDoc} from 'firebase/firestore'
import Router from 'next/router';

export default function Login() {
  const db = getFirestore(app)
  const [email,setEmail] = useState('')
  const userscollection = collection(db,"users")
  const [data] = useCollectionData(userscollection)
  const [password,setPassword] = useState('')
  const login = async (e) => {
    e.preventDefault()
    let jwttoken = localStorage.getItem('jwt')
    if(jwttoken){

        const det = jwt.decode(jwttoken)
        const user = data.filter(x => x.email === det.email)
        console.log(user)
        const pass = CryptoJS.AES.decrypt(user[0].password,'khotakhota').toString(CryptoJS.enc.Utf8)
        if(pass === email){

            
            toast.success("Password changed successfully", {
                position: "top-left",
                autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
        console.log(doc(userscollection,det.email))
        setDoc(doc(userscollection,det.email),{
            email:det.email,
            password:CryptoJS.AES.encrypt(password,'khotakhota').toString()
        })
        }
        else{
            toast.error("Wrong password", {
                position: "top-left",
                autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });

        }
          
      
        
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
      <div className="min-h my-32 -full flex absolute items-center ml-smlogin md:ml-login justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Change Password</h2>
          </div>
          <form className="mt-8 space-y-6" action="#" method="POST" onSubmit={login}>
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Old Password
                </label>
                <input
                  name="password"
                  type="passworda"
                  value={email}
                  onChange={(e)=>{setEmail(e.target.value)}}
                  autoComplete="password"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Old password"
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  New Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="passworda"
                  value={password}
                  onChange={(e)=>{setPassword(e.target.value)}}
                  autoComplete="currenta"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="New Password"
                />
              </div>
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
                Change Password
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}
