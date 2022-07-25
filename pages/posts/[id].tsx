import { GetStaticProps } from "next";
import Head from "next/head";
import Layout from "../../components/layout";
import { getPostData, getPostPaths } from "../../lib/posts";

export function getStaticPaths({ params }) {
    return {
        paths: getPostPaths(),
        fallback: false
    }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
    return {
        props: {
            post: await getPostData(params.id as string)
        }
    }
}

export default function Post({ post }) {
    return (
        <Layout>
            <Head>
                <title>{post.title}</title>
            </Head>
            <article className="container mx-auto flex flex-col space-y-6 max-w-[65ch]">
                <div className="flex flex-col space-y-2 text-center">
                    <h1 className="text-2xl font-bold">{post.title}</h1>
                    <span className="italic text-lg">{post.description}</span>
                </div>
                <div className="flex justify-center">
                    <div className="prose" dangerouslySetInnerHTML={{ __html: post.htmlContent }}>
                    </div>
                </div>
            </article>
        </Layout >
    )
}