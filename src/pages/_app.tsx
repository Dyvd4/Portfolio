import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { Roboto } from "@next/font/google"

const robotoFont = Roboto({ weight: "400", subsets: ["latin"] })

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={robotoFont.className}>
      <Component {...pageProps} />
    </main>
  )
}
