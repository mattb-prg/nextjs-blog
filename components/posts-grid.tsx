import { FC } from "react"
import { IPostData, IPostMatter } from "../lib/posts"
import { HomePost } from "./home-post"

interface IPostsGridProps {
    posts: IPostMatter[]
}

export const PostsGrid: FC<IPostsGridProps> = ({ posts }) => {
    return (
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-14'>
            {posts.map((post) => <HomePost key={post.id} postMatter={post} />)}
        </div>
    )
}