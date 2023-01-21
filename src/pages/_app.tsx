import '@/styles/globals.css'
import Navbar from '@components/Navbar'
import { Roboto } from "@next/font/google"
import { applyDarkMode } from '@utils/DarkModeUtils'
import type { AppProps } from 'next/app'
import { useEffect } from 'react'

const robotoFont = Roboto({ weight: "400", subsets: ["latin"] })

export default function App({ Component, pageProps }: AppProps) {

  useEffect(() => {
    applyDarkMode()
  }, []);

  return (
    <main className={`${robotoFont.className} dark:bg-gray-900 h-screen`}>
      <Navbar />
      <Component {...pageProps} />
    </main>
  )
}