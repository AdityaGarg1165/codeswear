import Link from 'next/link'
import Topload from './toploader'
import {FaTshirt} from 'react-icons/fa'
import {MdOutlineDeliveryDining} from 'react-icons/md'
import {AiFillDollarCircle} from 'react-icons/ai'
import styles from '../styles/Home.module.css'
import {app} from './firebase'
import {collection, getFirestore, limit, query} from 'firebase/firestore'
import {useCollectionData} from 'react-firebase-hooks/firestore'
export default function Home({updateTop,time}) {
  const db = getFirestore(app)
  const recentcollection = collection(db,'hpducts')
  const limited = query(recentcollection,limit(3))
  const [data] = useCollectionData(limited)
  return (
    <div className={styles.container}>
      <img src="/home.jpg" width={2200} className='animate-[load_2s_ease-in-out]' alt="" />
      <h1 className='text-4xl ml-4 font-medium my-12 animate-[load_1s_ease-in-out]'>Our Latest Collection</h1>
      <section className="text-gray-600 body-font">
  <div className="container ml-44 px-5 py-24 mx-auto">
    <div  className="flex flex-wrap -m-4 animate-[load_1.5s_ease-in-out] ml-28">
      {data && data.map((item)=>(
      <Link key={item.id} href={`/product/${item.name}`}>
        <div className="lg:w-1/4 md:w-1/ p-4 w-full cursor-pointer -ml-52 xxsm:-ml-44 xxxsm:-ml-44 xxxxsm:-ml-44 xxxxxsm:-ml-36 md:-ml-0 space-x-3">
        <a className="block relative h-48 rounded overflow-hidden">
          <img alt="ecommerce" className="object-cover object-center w-full h-full block animate[load_1s_ease-in-out]" src={item.photourl}/>
        </a>
        <div className="mt-4">
          <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">{item.cat}</h3>
          <h2 className="text-gray-900 title-font text-lg font-medium">{item.name}</h2>
          <p className="mt-1">₹{item.price}</p>
        </div>
      </div>
        </Link>
        ))}


    
    </div>
  </div>
</section>
<section className="ml-28 text-gray-600 body-font">
  <div className="container px-5 py-24 mx-auto">
    <div className="flex flex-wrap -m-4">
     
      <div className="xl:w-1/3 md:w-1/2 p-4">
        <div className="border border-gray-200 p-6 rounded-lg">
          <div className="w-10 h-10 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 mb-4">
          <FaTshirt/>
          </div>
          <h2 className="text-lg text-gray-900 font-medium title-font mb-2">Premium Tshirts</h2>
          <p className="leading-relaxed text-base">We have a variety of Premium tshirts</p>
        </div>
      </div>
      <div className="xl:w-1/3 md:w-1/2 p-4">
        <div className="border border-gray-200 p-6 rounded-lg">
          <div className="w-10 h-10 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 mb-4">
          <MdOutlineDeliveryDining></MdOutlineDeliveryDining>
          </div>
          <h2 className="text-lg text-gray-900 font-medium title-font mb-2">Super fast delivery</h2>
          <p className="leading-relaxed text-base">We provide super fast delivery all over india</p>
        </div>
      </div>
      <div className="xl:w-1/3 md:w-1/2 p-4">
        <div className="border border-gray-200 p-6 rounded-lg">
          <div className="w-10 h-10 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 mb-4">
          <AiFillDollarCircle></AiFillDollarCircle>
          </div>
          <h2 className="text-lg text-gray-900 font-medium title-font mb-2">Exciting offers</h2>
          <p className="leading-relaxed text-base">We provide exciting offers</p>
        </div>
      </div>
    </div>
  </div>
</section>
    </div>
  )
}
