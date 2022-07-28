import { FC, ReactNode } from "react";

interface IButtonProps {
    children: ReactNode
}
export const Button: FC<IButtonProps> = (props) => {
    return (
        <button className="text-white px-4 py-3 rounded bg-orange-400">{props.children}</button>
    )
}
