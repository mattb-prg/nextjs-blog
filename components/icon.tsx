import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { FC } from "react";

// Custom icon component as the Fontawesome react library is way too large.

interface IIconProps {
    icon: IconDefinition
    className?: string
    title?: string
}
export const Icon: FC<IIconProps> = ({ icon, className, title }) => {
    return (
        <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox={`0 0 ${icon.icon[0]} ${icon.icon[1]}`}>
            {title && (
                <title>{title}</title>
            )}
            <path d={icon.icon[4] as string} />
        </svg>
    )
}