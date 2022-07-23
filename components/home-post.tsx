import Image from "next/image";
import { FC } from "react";
import { Link } from "./link";

interface IHomePostProps {
    postMatter: {
        [p: string]: any
    }
}
export const HomePost: FC<IHomePostProps> = (props) => {
    const {
        postMatter
    } = props;
    const link = `/posts/${postMatter.id}`
    return (
        <div className="grid grid-cols-1 w-full space-y-2">
            <div>
                <Link href={link}>
                    <Image className="rounded-md" src={postMatter.thumbnail} layout='responsive' height={350} width={500} />
                </Link>
            </div>
            <div className="flex flex-col space-y-2">
                <span><span className="font-bold">Business, travel</span> - <span className="font-light text-slate-400">{postMatter.date}</span></span>
                <div className="flex flex-col space-y-1">
                    <Link href={link}>
                        <span className="font-bold text-lg">{postMatter.title}</span>
                    </Link>
                    <span className="text-slate-500">{postMatter.description}</span>
                </div>
            </div>
        </div>
    )
}