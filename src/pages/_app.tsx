import '@/styles/globals.css'
import Footer from '@components/Footer'
import LoadingCircle from '@components/LoadingCircle'
import Navbar from '@components/Navbar'
import useRouterLoadingState from '@hooks/useRouterLoadingState'
import { Inter } from "@next/font/google"
import { applyDarkMode } from '@utils/DarkModeUtils'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { useEffect } from 'react'

const robotoFont = Inter({ subsets: ["latin"] })

export default function App({ Component, pageProps }: AppProps) {

	const [isLoading] = useRouterLoadingState()

	useEffect(() => {
		applyDarkMode();
	}, []);

	return (
		<>
			<Head>
				<link rel="shortcut icon" href="favicon.png" type="image/x-icon" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<meta name="author" content="David Kimmich" />
			</Head>
			<div className={`${robotoFont.className} bg-white dark:bg-gray-900 transition-colors`}>
				<div className='min-h-screen'>
					<Navbar />
					{!isLoading && <>
						<div className="max-w-screen-md mx-auto px-8">
							<Component {...pageProps} />
						</div>
					</>}
					{isLoading && <>
						<div className='absolute top-1/2 left-1/2
							transform -translate-x-1/2 -translate-y-1/2'>
							<LoadingCircle />
						</div>
					</>}
				</div>
				<Footer />
			</div>
		</>
	)
}
