import React from 'react'
import Link from 'next/link'
import {collection, getFirestore} from 'firebase/firestore'
import {useCollectionData} from 'react-firebase-hooks/firestore'
import {app} from './firebase'
import { useEffect } from 'react'
const Tshirts = () => {
  const db = getFirestore(app)
  const tshirts = []
  const coll = collection(db,"T-shirts")
  const [data] = useCollectionData(coll)
  useEffect(()=>{
    
  },[])
  

    return(
        <div>
            <section className="text-gray-600 body-font">
  <div className="container px-5 py-24 mx-auto">
      <div className="flex flex-wrap -m-4">
    {data && data.map((item)=>(
      <Link key={item.id} href={`product/${item.Name}`}><div className="lg:w-1/4 md:w-1/2 p-4 w-full shadow-lg cursor-pointer">
        <a className="block relative  rounded overflow-hidden">
          <img alt="ecommerce" className="object-cover object-center w-full h-full block animate-[load_2s_ease-in-out]" src={item.photourl}></img>
        </a>
        <div className="mt-4">
          <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">T-Shirts</h3>
          <h2 className="text-gray-900 title-font text-lg font-medium">{item.Name}</h2>
          <p className="mt-1">₹{item.Price}</p>
          <p className="mt-1">S, M, L, XL, XXL</p>
        </div>
      </div>
      </Link>
      ))}
    </div>
  </div>
</section>
        </div>
    )
}
export default Tshirts