import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <img src="/home.jpg" className='' alt="" />
      <h1 className='text-4xl font-medium my-12'>Our Latest Collection</h1>
    </div>
  )
}
