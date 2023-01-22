import '@/styles/globals.css'
import Navbar from '@components/Navbar'
import { Inter } from "@next/font/google"
import { applyDarkMode } from '@utils/DarkModeUtils'
import type { AppProps } from 'next/app'
import { useEffect } from 'react'

const robotoFont = Inter({ subsets: ["latin"] })

export default function App({ Component, pageProps }: AppProps) {

  useEffect(() => {
    applyDarkMode()
  }, []);

  return (
    <main className={`${robotoFont.className} dark:bg-gray-900 h-screen transition-colors`}>
      <Navbar />
      <Component {...pageProps} />
    </main>
  )
}
