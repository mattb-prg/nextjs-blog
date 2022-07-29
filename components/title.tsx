import { FC, ReactNode } from "react"
import { title } from "../config"

interface ITitleProps {
    children: ReactNode
}
export const Title: FC<ITitleProps> = ({ children }) => {
    return (
        <title>shit</title>
    )
}
