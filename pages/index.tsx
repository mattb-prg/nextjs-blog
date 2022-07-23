import Head from 'next/head';
import Link from 'next/link';
import { Carousel } from '../components/carousel';
import { HomePost } from '../components/home-post';
import Layout, { siteTitle } from '../components/layout';
import { TopPost } from '../components/top-post';
import { getAllPostsFrontMatter, getPostData, IPostData } from '../lib/posts';

export async function getStaticProps() {
  const allPostMatter = getAllPostsFrontMatter()
  const topPosts = await Promise.all(allPostMatter.filter((post) => post.top).map((v) => getPostData(v.id)))
  return {
    props: {
      posts: allPostMatter,
      topPosts
    }
  }
}

interface IHomeProps {
  posts: {
    [p: string]: any
  }
  topPosts: IPostData[]
}
export default function Home({ posts, topPosts }: IHomeProps) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <div className='space-y-14'>
        <section className='container mx-auto space-y-7'>
          <div className='flex justify-center'>
            <span className='text-3xl font-bold'>Popular</span>
          </div>
          <Carousel children={topPosts.map((tp) => <TopPost post={tp} />)} />
        </section>
        <section className='container mx-auto space-y-3'>
          <h2 className='text-2xl font-bold text-center'>Posts</h2>
          <div className='grid grid-cols-1 lg:grid-cols-3 gap-14'>
            {posts.map((post) => <HomePost postMatter={post} />)}
          </div>
        </section>
      </div>
    </Layout>
  );
}