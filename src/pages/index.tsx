import Button from '@components/Button'
import IconLink from '@components/IconLink'
import Text from '@components/Text'
import Head from 'next/head'

export default function Home(props) {
	return (
		<>
			<Head>
				<title>David Kimmich</title>
				<meta name="description" content="This is a portfolio of David Kimmich" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
			</Head>
			<main className="absolute top-1/2 left-1/2 
							transform -translate-x-1/2 -translate-y-1/2">
				<div className="flex flex-col items-center">
					<Text>
						<h1 className='text-6xl font-black'>
							Intuitive. Useful. Beautiful.
						</h1>
					</Text>
					<Text
						className='mt-8 text-center'
						variant='secondary'>
						<p>
							These are the properties a web app should have.
						</p>
						<p>
							I am David Kimmich, a 18 year old web dev.
							If you want to know more about me:
						</p>
					</Text>
					<Button className='group mt-8'>
						<IconLink href={"/AboutMe"}>
							Read more
						</IconLink>
					</Button>
				</div>
			</main>
		</>
	)
}
