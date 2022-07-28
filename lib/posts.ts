import fs from 'fs';
import path from 'path'
import gray from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html'
import { postsPerPage } from '../config';

const postsDir = path.resolve(process.cwd(), 'posts')

function getPostFilenames() {
    return fs.readdirSync(postsDir).filter((name) => name.includes('.md'))
}

export function getPostPaths() {
    return getPostFilenames().map((filename) => filename.replace(/\.md$/, '')).map((id) => ({
        params: { id },
    }))
}

export interface IPostData extends IPostMatter {
    htmlContent: string
}
export async function getPostData(id: string): Promise<IPostData> {
    const postData = fs.readFileSync(path.resolve(postsDir, `${id}.md`))
    const matter = gray(postData)
    const htmlContent = (await remark().use(html).process(matter.content)).toString()

    return {
        id,
        ...matter.data,
        htmlContent,
    }
}

export interface IPostMatter {
    id: string
    [p: string]: any
}
export function getAllPostsFrontMatter() {
    const postFilenames = getPostFilenames()

    return postFilenames.map((filename) => {
        const id = filename.replace(/\.md$/, '')
        const postData = fs.readFileSync(path.resolve(postsDir, filename))
        const matter = gray(postData)
        return {
            id,
            ...matter.data,
        } as IPostMatter
    }).sort(({ date: a }, { date: b }) => {
        if (a < b) {
            return 1;
        } else if (a > b) {
            return -1;
        } else {
            return 0;
        }
    })
}

export interface IFrontMatterPage {
    page: number
    posts: IPostMatter[]
    next: boolean
    totalPages: number
}
export function getFrontMatterPage(page = 1): IFrontMatterPage {
    const start = (page - 1) * postsPerPage
    const end = page * postsPerPage
    const allPosts = getAllPostsFrontMatter()
    const posts = allPosts.slice(start, end)

    return {
        posts,
        page,
        totalPages: Math.ceil(allPosts.length / postsPerPage),
        next: end < allPosts.length
    }
}

