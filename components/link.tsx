import { FC, ReactNode } from "react"
import NextLink from 'next/link';

interface ILinkProps {
    href: string
    children: ReactNode
}

export const Link: FC<ILinkProps> = (props) => {
    return (
        <NextLink href={props.href}>
            <a className="underline decoration-transparent hover:decoration-orange-400 decoration-4 transition-all duration-200">
                {props.children}
            </a>
        </NextLink>
    )
}