import { faLock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import { GetStaticProps } from "next";
import Head from "next/head";
import Layout from "../../components/layout";
import { useIsLoggedIn } from "../../hooks/useIsLoggedIn";
import { fakePost } from "../../lib/fake-post";
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
    const {
        premium
    } = post;
    const isLoggedIn = useIsLoggedIn()
    const hideContent = premium && !isLoggedIn
    return (
        <Layout>
            <Head>
                <title>{premium && 'Premium'}{post.title}</title>
            </Head>
            <article className="container mx-auto flex flex-col space-y-6 max-w-[65ch]">
                <div className="flex flex-col space-y-2 text-center">
                    <h1 className="text-2xl font-bold">{premium && 'Premium: '}{post.title}</h1>
                    <span className="italic text-lg">{post.description}</span>
                </div>
                <div className={"flex justify-center relative"}>
                    <div className={
                        classNames('prose', {
                            'blur': hideContent
                        })
                    } dangerouslySetInnerHTML={{ __html: hideContent ? fakePost : post.htmlContent }}>
                    </div>
                    {
                        premium && isLoggedIn === false && (
                            <div className="absolute top-5 flex space-x-2 items-center font-bold border-black p-3 border-2">
                                <span className="w-4 text-orange-500">
                                    <FontAwesomeIcon icon={faLock} />
                                </span>
                                <span>
                                    Please log in to view content
                                </span>
                            </div>
                        )
                    }
                </div>
            </article>
        </Layout >
    )
}