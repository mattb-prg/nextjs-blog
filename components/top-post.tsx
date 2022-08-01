import Image from "next-image-export-optimizer"
import { FC } from "react"
import { IPostData } from "../lib/posts"
import { Link } from "./link"

interface ITopPostProps {
    post: IPostData
}
export const TopPost: FC<ITopPostProps> = (props) => {
    const {
        post,
    } = props;
    const link = `/posts/${post.id}`
    return (
        <div className="w-full grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-7 lg:items-center">
            <div>
                <Link href={link}>
                    <Image className="rounded-md" src={post.thumbnail} width={1000} height={700} priority={true} title={post.title} />
                </Link>
            </div>
            <div className="flex flex-col space-y-4">
                <span>
                    <span className="font-bold">
                        <Link href={`/categories/${post.category}`}>
                            <span className="font-bold">{post.category}</span>
                        </Link>
                    </span>
                    {' - '}
                    <span className="font-light text-slate-400">{post.date}</span></span>
                <div className="flex flex-col space-y-2">
                    <Link href={link}>
                        <span className="font-bold text-2xl lg:text-3xl">{post.title}</span>
                    </Link>
                    <span className="text-slate-500">{post.description}</span>
                </div>
            </div>
        </div>
    )
}