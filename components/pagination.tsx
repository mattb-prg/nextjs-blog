import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import classNames from "classnames";
import Link from "next/link";
import { FC } from "react";
import { Icon } from "./icon";

interface IPaginationProps {
    currentPage: number
    totalPages: number
}
export const Pagination: FC<IPaginationProps> = (
    { currentPage, totalPages }
) => {
    return (
        <div className="flex border rounded-md items-center divide-x select-none">
            <Link href={`/page/${currentPage - 1}`}>
                <a className={
                    classNames("py-3 px-4 hover:text-orange-600", {
                        'pointer-events-none opacity-50': currentPage === 1
                    })
                }>
                    <Icon className="w-2" icon={faChevronLeft} />
                </a>
            </Link>
            {
                Array(totalPages).fill(true).map((_, i) => (
                    <Link key={i} href={`/page/${i + 1}`}>
                        <a className={
                            classNames("py-3 px-4 hover:text-orange-600", {
                                'text-orange-600': i + 1 === currentPage
                            })
                        }>
                            {i + 1}
                        </a>
                    </Link>
                ))
            }
            <Link href={currentPage !== totalPages ? `/page/${currentPage + 1}` : `#`}>
                <a className={
                    classNames("py-3 px-4 hover:text-orange-600", {
                        'pointer-events-none opacity-50': currentPage === totalPages
                    })
                }>
                    <Icon className="w-2" icon={faChevronRight} />
                </a>
            </Link>
        </div>
    )
}
