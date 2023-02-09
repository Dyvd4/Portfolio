import Badge from '@components/Badge';
import Button from '@components/Button';
import IconLink from '@components/IconLink';
import useAge from '@hooks/useAge';
import Head from 'next/head';

export default function Home(props) {

	const age = useAge();

	return (
		<>
			<Head>
				<title>David Kimmich</title>
				<meta name="description" content="This is a portfolio of David Kimmich" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
			</Head>
			<main className="absolute top-1/2 left-1/2 overflow-hidden max-w-full
							transform -translate-x-1/2 -translate-y-1/2">
				<div className="flex flex-col items-center">
					<h1 className='flex flex-col gap-4 md:flex-row'>
						<Badge variant="yellow" className='text-6xl font-black text-black dark:text-white'>
							Intuitive.
						</Badge>
						<Badge variant="green" className='text-6xl font-black text-black dark:text-white'>
							Useful.
						</Badge>
						<Badge variant="pink" className='text-6xl font-black text-black dark:text-white'>
							Beautiful.
						</Badge>
						{/* Intuitive. Useful. Beautiful. */}
					</h1>
					<div className='mt-8 text-center'>
						<p className='text-secondary'>
							These are the properties a web app should have.
						</p>
						<p className='text-secondary mt-2 md:mt-0'>
							I am David Kimmich, a {age} year old web dev.
							If you want to know more about me:
						</p>
					</div>
					<Button className='group mt-8'>
						<IconLink
							variant="black"
							href={"/AboutMe"}>
							Read more
						</IconLink>
					</Button>
				</div>
			</main>
		</>
	)
}
