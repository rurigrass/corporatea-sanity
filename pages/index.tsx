import { sanityClient } from '../sanity'
import Head from 'next/head'
import Link from 'next/link'
import Header from '../components/Header'
import Banner from '../components/Banner'
import TeaBox from '../components/TeaFeed/TeaBox'
import TeaFeed from '../components/TeaFeed/TeaFeed'

import { ICompanies, ICompany, IPost, IPosts, ISpills } from "../typings";
import Post from '../components/Posts/Post'
import { fetchSpills } from '../utils/fetchSpills'

export default function Home(props: (IPosts & ICompanies & ISpills)) {
  const { posts, companies, spills } = props

  return (
    <div className="max-w-7xl mx-auto bg-blue-tintiest">
      <Head>
        <title>Bulby Leaks</title>
      </Head>
      <Header />
      <Banner />
      <div className='max-w-2xl mx-auto'>
        <TeaBox companies={companies} />
        <TeaFeed spills={spills} />
      </div>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-6 p-2 md:p-6 bg-blue-shady'>
        {posts.map(post => {
          return (
            <Post key={post._id} post={post} />
          )
        })}
      </div>
      {/* <Footer /> */}
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

  const spills = await fetchSpills()

  return {
    props: {
      posts,
      companies,
      spills
    }
  }
};
