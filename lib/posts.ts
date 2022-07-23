import fs from 'fs';
import path from 'path'
import gray from 'gray-matter';
import remark from 'remark';
import html from 'remark-html'

const postsDir = path.resolve(process.cwd(), 'posts')

function getPostFilenames() {
    return fs.readdirSync(postsDir).filter((name) => name.includes('.md'))
}

export function getPostIds() {
    return getPostFilenames().map((filename) => filename.replace(/\.md$/, '')).map((id) => ({
        params: { id },
    }))
}

export interface IPostData {
    [p: string]: any
    id: string
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

export function getAllPostsFrontMatter() {
    const postFilenames = getPostFilenames()

    return postFilenames.map((filename) => {
        const id = filename.replace(/\.md$/, '')
        const postData = fs.readFileSync(path.resolve(postsDir, filename))
        const matter = gray(postData)
        return {
            id,
            ...matter.data,
        } as {
            id: string,
            [p: string]: any
        }
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

