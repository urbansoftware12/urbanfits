import '@/styles/globals.css'
import '@/styles/pillbtns.css'
import '@/styles/carousels.css'
import React, { useState, useEffect } from 'react'
import { SessionProvider } from "next-auth/react"
import Navbar from '@/components/navbars/navbar'
import Footer from '@/components/footer'
import dynamic from 'next/dynamic';
import { ToastContainer } from 'react-toastify'
import useUser from '@/hooks/useUser'
import useWallet from '@/hooks/useWallet'
import { useRouter } from 'next/router'
import { CartProvider } from "react-use-cart";
import getGeoLocation from '@/utils/geo-location'
import LoadingBar from 'react-top-loading-bar'
import toaster from "@/utils/toast_function";
import axios from 'axios'
import { pusherClient } from '@/utils/pusher'
import PusherClient from 'pusher-js'
import { urbanist } from '@/fonts'

function App({ Component, pageProps: { session, ...pageProps } }) {
  const router = useRouter()
  const { user, guestUser, setGuestUser, setNotification, logOut } = useUser()
  const { getExchangeRate } = useWallet()
  const [progress, setProgress] = useState(0)
  const [lastPresenceChannel, setLastPresenceChannel] = useState(null)
  const [pusherPresenceClient, setPusherPresenceClient] = useState(new PusherClient(process.env.NEXT_PUBLIC_PUSHER_KEY, {
    cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER,
    authEndpoint: `${process.env.NEXT_PUBLIC_HOST}/api/pusher/auth`,
    auth: {
      params: {
        user_id: user?._id,
        email: user?.email
      }
    }
  }))

  const subscribeToPresence = async () => {
    let presenceInstance;
    if (user && user._id) {
      presenceInstance = pusherPresenceClient;
    }
    else if (guestUser && guestUser._id) {
      presenceInstance = new PusherClient(process.env.NEXT_PUBLIC_PUSHER_KEY, {
        cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER,
        authEndpoint: `${process.env.NEXT_PUBLIC_HOST}/api/pusher/auth`,
        auth: { params: { user_id: `${guestUser._id}_isguest` } }
      });
      setPusherPresenceClient(presenceInstance);
    } else {
      try {
        const { data } = await axios.post(`${process.env.NEXT_PUBLIC_HOST}/api/user/guest/create-session`, {});
        setGuestUser(data.user);
        console.log(data.user);
        presenceInstance = new PusherClient(process.env.NEXT_PUBLIC_PUSHER_KEY, {
          cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER,
          authEndpoint: `${process.env.NEXT_PUBLIC_HOST}/api/pusher/auth`,
          auth: { params: { user_id: `${data.user._id}_isguest` } }
        });
        setPusherPresenceClient(presenceInstance);
      } catch (e) { console.log(e) }
    }

    if (presenceInstance) {
      const channel = presenceInstance.subscribe('presence-urbanfits');
      setLastPresenceChannel(channel);
    }
  };

  useEffect(() => {
    if (lastPresenceChannel) lastPresenceChannel.unsubscribe('presence-urbanfits')
    subscribeToPresence();
    if (user) {
      const userChannel = pusherClient.subscribe(`uf-user_${user._id}`)
      userChannel.bind('new-notification', (data) => {
        setNotification(data.notification_data.notifications)
        if (data.notify) toaster("info", data.notification_data.notifications[0].mini_msg)
      })
    }
    return () => pusherPresenceClient && pusherPresenceClient.unsubscribe('presence-urbanfits');
  }, []);

  useEffect(() => {
    getExchangeRate()
    getGeoLocation()

    const igniteSession = () => {
      setGuestUser(null)
      const sessionValid = localStorage.getItem('remember_me')
      if (sessionValid === true) logOut()
    }
    window.addEventListener("beforeunload", igniteSession)
    return () => window.removeEventListener("beforeunload", igniteSession)
  }, [])
  useEffect(() => {
    router.events.on("routeChangeStart", () => setProgress(77))
    router.events.on("routeChangeComplete", () => setProgress(100))
  }, [router.events])

  return <main className={`${urbanist.className} antialiased`}>
    <LoadingBar color='#FF4A60' height={4} waitingTime={1} loaderSpeed={1200} shadow={true} progress={progress} onLoaderFinished={() => setProgress(0)} />
    <ToastContainer className={`toast ${urbanist.className} antialiased`} />
    <SessionProvider session={session}>
      <CartProvider>
        <Navbar />
        <Component {...pageProps} />
        <Footer />
      </CartProvider>
    </SessionProvider>
  </main>
}
export default dynamic(() => Promise.resolve(App), { ssr: false })