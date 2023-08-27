import '@/styles/globals.css'
import Breadcrumb, { BreadcrumbItem } from '@components/Breadcrumb'
import Footer from '@components/Footer'
import LoadingCircle from '@components/LoadingCircle'
import ModalPortal from '@components/ModalPortal'
import Navbar from '@components/Navbar'
import breadcrumbAtom from '@context/atoms/BreadcrumbAtom'
import useRouterLoadingState from '@hooks/useRouterLoadingState'
import { Inter } from "@next/font/google"
import { applyDarkMode } from '@utils/DarkModeUtils'
import { useAtom } from 'jotai'
import { SessionProvider } from "next-auth/react"
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { useEffect } from 'react'
import { Toaster } from 'react-hot-toast'

const robotoFont = Inter({ subsets: ["latin"] })

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {

	const [isLoading] = useRouterLoadingState()
	const [breadcrumb] = useAtom(breadcrumbAtom);

	useEffect(() => {
		applyDarkMode();
	}, []);

	return (
		<>
			<Head>
				<link rel="shortcut icon" href="/Logo.png" type="image/x-icon" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<meta name="author" content="David Kimmich" />
			</Head>
			<SessionProvider session={session}>
				<div className={`${robotoFont.className} bg-white dark:bg-gray-900 transition-colors`}>
					<div className='min-h-screen'>
						<Navbar />
						{!isLoading && <>
							<div className="max-w-screen-md mx-auto px-8 pt-2">
								<Breadcrumb className='pb-8'>
									{breadcrumb.items.map((item, i) => (
										<BreadcrumbItem {...item} key={i} />
									))}
								</Breadcrumb>
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
					<Toaster position="bottom-center" />
					<ModalPortal />
					<Footer />
				</div>
			</SessionProvider>
		</>
	)
}
