import { faLock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import { GetStaticProps } from "next";
import Head from "next/head";
import Image from "next/image";
import Layout from "../../components/layout";
import { authors } from "../../config";
import { useIsLoggedIn } from "../../hooks/useIsLoggedIn";
import { fakePost } from "../../lib/fake-post";
import { getPostData, getPostPaths } from "../../lib/posts";
import { extractContents, wordCount } from "../../lib/utils";

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
        premium,
        authorId,
        date,
        title,
        description,
        htmlContent,
        thumbnail,
    } = post;
    const author = authors[authorId]
    const isLoggedIn = useIsLoggedIn()
    const hideContent = premium && !isLoggedIn
    const wrdCount = wordCount(extractContents(htmlContent))
    const readingTime = Math.ceil((wrdCount / 250)).toPrecision(1)
    const dateStr = (new Date(date)).toLocaleDateString('default', { month: 'long', day: 'numeric', year: 'numeric' })
    return (
        <Layout>
            <Head>
                <title>{premium && 'Premium'}{title}</title>
            </Head>
            <article className="container mx-auto flex flex-col space-y-6 max-w-[65ch]">
                <div className="flex flex-col space-y-2 text-center">
                    <h1 className="text-2xl font-bold">{premium && 'Premium: '}{title}</h1>
                    <span className="italic text-lg">{description}</span>
                </div>
                <div className="flex h-20 space-x-3">
                    <div>
                        <Image className="rounded-full flex-grow" src={'/images/profile.jpg'} height={50} width={50} />
                    </div>
                    <div className="flex flex-col space-y-3">
                        <span>{author.name}</span>
                        <span className="text-sm text-gray-500">
                            {dateStr} · {readingTime} minute{readingTime === '1' ? '' : 's'} read time
                        </span>
                    </div>
                </div>
                <div className={"flex justify-center relative"}>
                    <div className={
                        classNames('prose', {
                            'blur': hideContent
                        })
                    } dangerouslySetInnerHTML={{ __html: hideContent ? fakePost : htmlContent }}>
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