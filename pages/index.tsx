import Head from 'next/head';
import Link from 'next/link';
import { Button } from '../components/button';
import { Carousel } from '../components/carousel';
import Layout, { siteTitle } from '../components/layout';
import { PostsGrid } from '../components/posts-grid';
import { TopPost } from '../components/top-post';
import { getAllPostsFrontMatter, getFrontMatterPage, getPostData, IFrontMatterPage, IPostData, IPostMatter } from '../lib/posts';

export async function getStaticProps() {
  const allPostMatter = getAllPostsFrontMatter()
  const topPosts = await Promise.all(allPostMatter.filter((post) => post.top).map((v) => getPostData(v.id)))
  return {
    props: {
      page: getFrontMatterPage(1),
      topPosts,
    }
  }
}

interface IHomeProps {
  page: IFrontMatterPage
  topPosts: IPostData[]
}
export default function Home({ topPosts, page }: IHomeProps) {
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
          <Carousel children={topPosts.map((tp) => <TopPost key={tp.id} post={tp} />)} />
        </section>
        <section className='container mx-auto space-y-3 flex flex-col items-center'>
          <h2 className='text-2xl font-bold text-center'>Posts</h2>
          <PostsGrid posts={page.posts} />
          {
            page.next && (
              <Link href='/page/2'>
                <a>
                  <Button>more</Button>
                </a>
              </Link>
            )
          }
        </section>
      </div>
    </Layout>
  );
}