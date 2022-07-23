import { GetStaticProps } from "next";
import Head from "next/head";
import Layout from "../../components/layout";
import { getPostData, getPostIds } from "../../lib/posts";

export function getStaticPaths({ params }) {
    return {
        paths: getPostIds(),
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
            <h2>{post.title}</h2>
            <div className="prose" dangerouslySetInnerHTML={{ __html: post.htmlContent }}>
            </div>
        </Layout>
    )
}