import '@/styles/globals.css';
import '@/styles/pillbtns.css';
import '@/styles/carousels.css';
import { useState, useEffect } from 'react';
import Navbar from '@/components/navbars/navbar';
import Footer from '@/components/footer';
import Newsletter from '@/components/modals/newsletter';
import dynamic from 'next/dynamic';
import { ToastContainer } from 'react-toastify'
import useUser from '@/hooks/useUser';
import useNewsletter from '@/hooks/useNewsletter';
import { useRouter } from 'next/router';
import { CartProvider } from "react-use-cart";
import LoadingBar from 'react-top-loading-bar';
import { initBeamsClient } from '@/utils/pusher';
import { urbanist } from '@/fonts';

function App({ Component, pageProps: { ...pageProps } }) {
  const router = useRouter();
  const { getMe, user, isLoggedIn, notifyIfNotCheckedIn, getNotifications, emitPresenceEvent, subscribePersonalChannel, recordVisit } = useUser();
  const { newsletterData } = useNewsletter();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    getMe();
    recordVisit();
    notifyIfNotCheckedIn()
  }, [])

  useEffect(() => {
    if (localStorage.getItem("letter_ad") !== "true" && !newsletterData?.email) setTimeout(() => {
      useNewsletter.setState({ show: true })
      localStorage.setItem("letter_ad", "true")
    }, 10000)

    let unSubPresence = null;
    let unSubPersonalChannel = null;
    if (isLoggedIn() && user) {
      getNotifications()
      initBeamsClient()
      unSubPresence = emitPresenceEvent()
      unSubPersonalChannel = subscribePersonalChannel()
    }

    return () => {
      if (unSubPresence) unSubPresence()
      if (unSubPersonalChannel) unSubPersonalChannel()
    }
  }, [user])

  useEffect(() => {
    router.events.on("routeChangeStart", () => setProgress(77))
    router.events.on("routeChangeComplete", () => setProgress(100))
  }, [router.events])

  return <main className={`max-w-[2000px] mx-auto ${urbanist.className} antialiased`}>
    <LoadingBar color='#FF4A60' height={4} waitingTime={1} loaderSpeed={1200} shadow={true} progress={progress} onLoaderFinished={() => setProgress(0)} />
    <ToastContainer className={`toast ${urbanist.className} antialiased`} />
    <Newsletter />
    <CartProvider>
      <Navbar />
      <Component {...pageProps} />
      <Footer />
    </CartProvider>
  </main>
}
export default dynamic(() => Promise.resolve(App), { ssr: false })