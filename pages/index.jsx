import Head from 'next/head'
import styles from '../styles/Home.module.css'
import {app} from './firebase'
import {collection, getFirestore, limit, query} from 'firebase/firestore'
import {useCollectionData} from 'react-firebase-hooks/firestore'
export default function Home() {
  const db = getFirestore(app)
  const recentcollection = collection(db,'hpducts')
  const limited = query(recentcollection,limit(3))
  const [data] = useCollectionData(limited)
  return (
    <div className={styles.container}>
      <img src="/home.jpg" className='' alt="" />
      <h1 className='text-4xl font-medium my-12'>Our Latest Collection</h1>
      <section className="text-gray-600 body-font">
  <div className="container ml-44 px-5 py-24 mx-auto">
    <div className="flex flex-wrap -m-4">
      {data && data.map((item)=>(
        <div key={item.id} className="lg:w-1/4 md:w-1/2 p-4 w-full">
        <a className="block relative h-48 rounded overflow-hidden">
          <img alt="ecommerce" className="object-cover object-center w-full h-full block" src={item.photourl}/>
        </a>
        <div className="mt-4">
          <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">{item.cat}</h3>
          <h2 className="text-gray-900 title-font text-lg font-medium">{item.name}</h2>
          <p className="mt-1">{item.price}</p>
        </div>
      </div>
        ))}


    
    </div>
  </div>
</section>
    </div>
  )
}
