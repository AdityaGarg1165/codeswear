import Link from 'next/link'
import { FaTshirt } from 'react-icons/fa'
import { MdOutlineDeliveryDining } from 'react-icons/md'
import { AiFillDollarCircle } from 'react-icons/ai'
import styles from '../styles/Home.module.css'
import { app } from './firebase'
import { collection, getFirestore, limit, query } from 'firebase/firestore'
import { useCollectionData } from 'react-firebase-hooks/firestore'
export default function Home({ updateTop, time }) {
  const db = getFirestore(app)
  const recentcollection = collection(db, 'hpducts')
  const limited = query(recentcollection, limit(3))
  const [data] = useCollectionData(limited)
  return (
    <div className='justify-center'>
      <img src="/home.png" width={2200} className='animate-[load_1s_ease-in-out] md:pt-20 pt-32' alt="" />
      <h1 className='text-4xl ml-4 font-medium my-12 animate-[load_1s_ease-in-out]'>Our Latest Collection</h1>
      <section className="text-gray-600 body-font md:ml-10 -ml-72">
        <div className="container ml-44 px-5 py-24 mx-auto">
          <div className="flex flex-wrap -m-4 animate-[load_1.5s_ease-in-out] ml-28">
                <section className="text-gray-600 body-font">
                  <div className="container px-5 py-24 mx-auto">
                    <div className="flex flex-wrap -m-4">
            {data && data.map((item) => (
              <Link key={item.id} href={`/product/${item.name}`}>
          
                      
                      <div className="p-4 md:w-1/3">
                        <div className="h-full border-2 w-60 md:w-46 border-gray-200 border-opacity-60 rounded-lg overflow-hidden">
                          <img className="lg:h-48 md:h-36 w-full object-cover object-center" src={item.photourl} alt="blog" />
                          <div className="p-6">
                            {/* <h2 class="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">CATEGORY</h2> */}
                            <h1 className="title-font text-lg font-medium text-gray-900 mb-3">{item.name}</h1>
                            {/* <p class="leading-relaxed mb-3">Photo booth fam kinfolk cold-pressed sriracha leggings jianbing microdosing tousled waistcoat.</p> */}
                            <div className="flex items-center flex-wrap ">
                              {/* <a class="text-indigo-500 inline-flex items-center md:mb-2 lg:mb-0">Buy */}
                              {/* </a> */}
                              {/* <span class="text-gray-400 mr-3 inline-flex items-center lg:ml-auto md:ml-0 ml-auto leading-none text-sm pr-3 py-1 border-r-2 border-gray-200">
                                <svg class="w-4 h-4 mr-1" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24">
                                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                                  <circle cx="12" cy="12" r="3"></circle>
                                </svg>1.2K
                              </span>
                              <span class="text-gray-400 inline-flex items-center leading-none text-sm">
                                <svg class="w-4 h-4 mr-1" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24">
                                  <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
                                </svg>6
                              </span> */}
                            </div>
                          </div>
                        </div>
                      </div>
              </Link>
              ))}
              </div>
              </div>
            </section>



          </div>
        </div>
      </section>
      <section className="ml-28 text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-wrap -m-4">

            <div className="xl:w-1/3 md:w-1/2 p-4">
              <div className="border border-gray-200 p-6 rounded-lg">
                <div className="w-10 h-10 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 mb-4">
                  <FaTshirt />
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
