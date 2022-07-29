import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import Layout from "../../components/layout";
import { Pagination } from "../../components/pagination";
import { PostsGrid } from "../../components/posts-grid";
import { Title } from "../../components/title";
import { getPagesPaths } from "../../lib/pages";
import { getFrontMatterPage, IFrontMatterPage } from "../../lib/posts";
import { createTitle } from "../../lib/utils";

export const getStaticPaths: GetStaticPaths = () => {
    return {
        paths: getPagesPaths(),
        fallback: false
    }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
    return {
        props: {
            page: getFrontMatterPage(Number(params.id))
        }
    }
}


interface IPageProps {
    page: IFrontMatterPage
}
export default function Page({
    page
}: IPageProps) {
    return (
        <Layout>
            <Head>
                <title>{createTitle(`Page ${page.page} results`)}</title>
            </Head>
            <section className="container mx-auto flex flex-col space-y-10">
                <div className="flex flex-col">
                    <PostsGrid posts={page.posts} />
                </div>
                <div className="flex justify-center">
                    <Pagination totalPages={page.totalPages} currentPage={page.page} />
                </div>
            </section>
        </Layout >
    )
}