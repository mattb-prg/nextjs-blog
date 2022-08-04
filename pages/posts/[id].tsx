import { faLock } from "@fortawesome/free-solid-svg-icons";
import classNames from "classnames";
import { GetStaticProps } from "next";
import Image from "next/image";
import Head from "next/head";
import { Icon } from "../../components/icon";
import Layout from "../../components/layout";
import { authors, imageSizes } from "../../config";
import { useIsLoggedIn } from "../../hooks/useIsLoggedIn";
import { fakePost } from "../../lib/fake-post";
import { getPostData, getPostPaths } from "../../lib/posts";
import { createTitle, extractContents, wordCount } from "../../lib/utils";

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
    const imageSrc = require('../../public' + thumbnail + '?resize&format=webp')
    return (
        <Layout>
            <Head>
                <title>{createTitle(title)}</title>
            </Head>
            <article className="container mx-auto flex flex-col items-center space-y-6">
                <div className="flex flex-col space-y-2 text-center">
                    <h1 className="text-2xl font-bold">{premium && 'Premium: '}{title}</h1>
                </div>
                <div className="max-w-[65ch] space-y-6">
                    <div className="flex flex-col justify-center items-center space-y-2">
                        {/* <Image className="rounded" src={thumbnail} height={400} width={600} alt={title} /> */}
                        <img className="rounded" sizes={imageSizes} src={imageSrc.src} srcSet={imageSrc.srcSet} height={400} width={600} alt={title} />
                        <span className="italic text-lg">{description}</span>
                    </div>
                    <div className="flex h-20 space-x-3">
                        <div>
                            {/* <Image className="rounded-full flex-grow" src={'/images/profile.jpg'} height={50} width={50} alt={'Profile'} /> */}
                            <img className="rounded-full flex-grow" src={require('../../public' + '/images/profile.jpg?webp')} height={50} width={50} alt={'Profile'} />
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
                                'blur select-none': hideContent,
                            })
                        } dangerouslySetInnerHTML={{ __html: hideContent ? fakePost : htmlContent }}>
                        </div>
                        {
                            premium && isLoggedIn === false && (
                                <div className="absolute top-5 flex space-x-2 items-center font-bold border-black p-3 border-2">
                                    <span className="w-4 text-orange-500">
                                        <Icon icon={faLock} />
                                    </span>
                                    <span>
                                        Please log in to view content
                                    </span>
                                </div>
                            )
                        }
                    </div>
                </div>
            </article>
        </Layout >
    )
}