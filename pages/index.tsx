import { sanityClient } from '../sanity'
import Head from 'next/head'
import Link from 'next/link'
import Header from '../components/Header'
import Banner from '../components/Banner'
import TeaBox from '../components/TeaFeed/TeaBox'

import { ICompanies, ICompany, IPost, IPosts } from "../typings";
import Post from '../components/Posts/Post'

export default function Home(props: (IPosts & ICompanies)) {
  const { posts, companies } = props

  return (
    <div className="max-w-7xl mx-auto bg-gray-light">
      <Head>
        <title>Bulby Leaks</title>
      </Head>
      <Header />
      <Banner />
      <TeaBox companies={companies} />
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-6 p-2 md:p-6 bg-blue-shady'>
        {posts.map(post => {
          return (
            <Post key={post._id} post={post} />
          )
        })}
      </div>
    </div >
  )
}

//only returns verified posts
//move to a Posts component
//change this to return most recent then filter verified afterwards
export const getServerSideProps = async () => {
  const postsQuery = `* [_type == "post"][verified] {
    _id,
    title,
    company -> {
    name
  },
  mainImage,
  slug
  }`;

  const posts = await sanityClient.fetch(postsQuery);

  const CompaniesQuery = `* [_type == "company"] | order(name asc) {
    _id,
    name,
    image,
    slug
  }`;

  const companies = await sanityClient.fetch(CompaniesQuery);

  return {
    props: {
      posts,
      companies
    }
  }
};
