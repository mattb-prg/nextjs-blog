import { FC } from "react";
import { socials } from "../config";
import { Icon } from "./icon";
import { User } from "./user";

export const Social: FC<{}> = () => {
    return (
        <>
            {
                socials.map(({ href, icon }) => (
                    <a className='w-4 fill-inherit hover:fill-orange-700' href={href} target='_blank'>
                        <Icon icon={icon} />
                    </a>
                ))
            }
        </>
    )
}