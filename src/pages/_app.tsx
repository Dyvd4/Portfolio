import '@/styles/globals.css'
import Footer from '@components/Footer'
import LoadingCircle from '@components/LoadingCircle'
import Navbar from '@components/Navbar'
import useRouterLoadingState from '@hooks/useRouterLoadingState'
import { Inter } from "@next/font/google"
import { applyDarkMode } from '@utils/DarkModeUtils'
import type { AppProps } from 'next/app'
import { useEffect } from 'react'

const robotoFont = Inter({ subsets: ["latin"] })

export default function App({ Component, pageProps }: AppProps) {

	const [isLoading] = useRouterLoadingState()

	useEffect(() => {
		applyDarkMode();
	}, []);

	return (
		<div className={`${robotoFont.className} bg-white dark:bg-gray-900 transition-colors`}>
			<div className='min-h-screen'>
				<Navbar />
				{!isLoading && <>
					<div className="max-w-screen-md mx-auto">
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
	)
}
