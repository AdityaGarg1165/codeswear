import '../styles/globals.css'
import Navbar from './navbar'
import Footer from './footer'

function MyApp({ Component, pageProps }) {
  return <>
  <Navbar/>
  <Component {...pageProps} />
  <Footer></Footer>
  </>
}

export default MyApp
