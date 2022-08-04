import { FC } from "react";
import { socials } from "../config";
import { Icon } from "./icon";

export const Social: FC<{}> = () => {
    return (
        <>
            {
                socials.map(({ href, icon, title }, i) => (
                    <a key={i} className='w-4 fill-inherit hover:fill-orange-700' href={href} target='_blank'>
                        <Icon title={title} icon={icon} />
                    </a>
                ))
            }
        </>
    )
}
