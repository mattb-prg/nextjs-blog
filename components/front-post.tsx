import Image from "next/image";
import { FC } from "react";
import { Link } from "./link";

interface IHomePostProps {
    postMatter: {
        [p: string]: any
    }
}
export const FrontPost: FC<IHomePostProps> = (props) => {
    const {
        postMatter
    } = props;
    const {
        id,
        title,
        description,
        category,
        premium,
        thumbnail,
        date
    } = postMatter;
    const link = `/posts/${id}`
    return (
        <div className="grid grid-cols-1 w-full space-y-2">
            <div>
                <Link href={link}>
                    <Image className="rounded-md" src={thumbnail} layout='responsive' height={350} width={500} />
                </Link>
            </div>
            <div className="flex flex-col space-y-2">
                <span>
                    <Link href={`/categories/${category}`}>
                        <span className="font-bold">{category}</span>
                    </Link>
                    {' - '}
                    <span className="font-light text-slate-400">{date}</span></span>
                <div className="flex flex-col space-y-1">
                    <Link href={link}>
                        <div className="font-bold text-lg whitespace-nowrap overflow-hidden text-ellipsis">{premium && 'Premium: '}{title}</div>
                    </Link>
                    <div className="text-slate-500 whitespace-nowrap overflow-hidden text-ellipsis">{description}</div>
                </div>
            </div>
        </div>
    )
}