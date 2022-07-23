import { FC } from "react";

interface ISidebarProps {
    show: boolean
    onClose(): void
}
export const Sidebar: FC<ISidebarProps> = ({
    onClose,
    show
}) => {
    return (
        <div className="fixed h-full bg-slate-100 transition-[left] w-52 z-50 shadow-lg"
            style={{
                left: !show ? -208 : 0
            }}
        >
            <span onClick={onClose}>close</span>
        </div>
    )
}