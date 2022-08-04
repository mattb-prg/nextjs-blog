import { faLock, faUnlock } from "@fortawesome/free-solid-svg-icons";
import { FC } from "react";
import { useIsLoggedIn } from "../hooks/useIsLoggedIn";
import { Icon } from "./icon";
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
    const isLoggedIn = useIsLoggedIn()
    const imageSrcSet = require('../public' + thumbnail + '?resize&sizes[]=300&sizes[]=400&sizes[]=500&sizes[]=760&format=webp')
    const imgSizes = '(min-width: 640px): 650px, (min-width: 768px): 760px, (min-width: 1024px): 300px, (min-width: 1280px): 400px, (min-width: 1538px): 500px, 100vw'
    return (
        <div className="grid grid-cols-1 w-full space-y-2">
            <div>
                <Link href={link}>
                    <img className="rounded-md" sizes={imgSizes} src={imageSrcSet.src} srcSet={imageSrcSet.srcSet} width={1000} height={700} alt={title} />
                    {/* <Image className="rounded-md" src={thumbnail} width={1000} height={700} alt={title} /> */}
                </Link>
            </div>
            <div className="flex flex-col space-y-2">
                <div className="flex justify-between">
                    <div>
                        <Link href={`/categories/${category}`}>
                            <span className="font-bold">{category}</span>
                        </Link>
                        {' - '}
                        <span className="font-light text-sm text-slate-700">{date}</span>
                    </div>
                    {
                        premium && (
                            <div className="w-3 fill-orange-600">
                                <Icon icon={isLoggedIn ? faUnlock : faLock} />
                            </div>
                        )
                    }
                </div>
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