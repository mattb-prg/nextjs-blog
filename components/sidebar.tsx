import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FC, ReactNode } from "react";
import { Icon } from "./icon";

interface ISidebarProps {
    children: ReactNode
    show: boolean
    onClose(): void
}
export const Sidebar: FC<ISidebarProps> = ({
    onClose,
    show,
    children,
}) => {
    return (
        <div className="fixed h-full bg-slate-100 transition-[left] w-52 p-2 z-50 shadow-lg"
            style={{
                left: !show ? -208 : 0
            }}
        >
            <div className="flex justify-end">
                <span className="w-3 cursor-pointer" onClick={onClose}>
                    <Icon icon={faXmark} />
                </span>
            </div>
            <div>
                {children}
            </div>
        </div>
    )
}