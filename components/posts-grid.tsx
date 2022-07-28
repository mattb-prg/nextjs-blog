import { FC } from "react"
import { IPostData, IPostMatter } from "../lib/posts"
import { FrontPost } from "./front-post"

interface IPostsGridProps {
    posts: IPostMatter[]
}

export const PostsGrid: FC<IPostsGridProps> = ({ posts }) => {
    return (
        <div className='w-full grid grid-cols-1 lg:grid-cols-3 gap-14'>
            {posts.map((post) => <FrontPost key={post.id} postMatter={post} />)}
        </div>
    )
}