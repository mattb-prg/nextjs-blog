import { FC, ReactNode } from "react"
import NextLink from 'next/link';

interface ILinkProps {
    href: string
    children: ReactNode
}

export const Link: FC<ILinkProps> = (props) => {
    return (
        <NextLink href={props.href}>
            <a className="hover:underline decoration-orange-400 decoration-4">
                {props.children}
            </a>
        </NextLink>
    )
}