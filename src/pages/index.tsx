import Button from '@components/Button'
import IconLink from '@components/IconLink'
import Text from '@components/Text'
import Head from 'next/head'
import { BsArrowRight } from "react-icons/bs"

export default function Home(props) {
  return (
    <>
      <Head>
        <title>David Kimmich</title>
        <meta name="description" content="This is a portfolio of David Kimmich" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main className="h-screen flex flex-col justify-center items-center">
        <Text>
          <h1 className='text-7xl font-black'>
            Intuitive. Useful. Beautiful.
          </h1>
        </Text>
        <div className='text-gray-300 mt-8 text-center'>
          <Text variant='secondary'>
            <p>
              These are the properties a web app should have.
            </p>
            <p>
              I am David Kimmich, a 18 year old web dev.
              If you want to know more about me:
            </p>
          </Text>
        </div>
        <Button className='group mt-8'>
          <IconLink href={"/AboutMe"} omitIconWrapper>
            Read more
          </IconLink>
        </Button>
      </main>
    </>
  )
}
