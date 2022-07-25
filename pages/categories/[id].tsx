import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import Layout from "../../components/layout";
import { PostsGrid } from "../../components/posts-grid";
import { categories } from "../../config";
import { getCategoryPaths, getCategoryPosts } from "../../lib/categories";

export const getStaticPaths: GetStaticPaths = () => {
    return {
        paths: getCategoryPaths(),
        fallback: false
    }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const category = categories.find((cat) => cat.id === params.id)
    return {
        props: {
            title: category.name,
            posts: getCategoryPosts(params.id as string)
        }
    }
}

export default function Category({
    title,
    posts
}) {
    return (
        <Layout>
            <Head>
                <title>Category - {title}</title>
            </Head>
            <section className="container mx-auto flex flex-col space-y-10">
                <div>
                    <h1 className="font-bold text-2xl">
                        {
                            posts.length === 0 ? `There are no posts under the category ${title}` :
                            `Posts under the category ${title}`
                        }
                    </h1>
                </div>
                <div className="flex flex-col">
                    <PostsGrid posts={posts} />
                </div>
            </section>
        </Layout >
    )
}