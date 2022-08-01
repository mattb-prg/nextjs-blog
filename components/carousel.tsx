import { FC, ReactNode, useEffect, useRef, useState } from "react";
import classNames from 'classnames';
import { latestTimeout } from "../lib/utils";

interface ICarouselProps {
    children: ReactNode[]
    className?: string
}
export const Carousel: FC<ICarouselProps> = (props) => {
    const slideCount = props.children.length
    const [activeSlide, setActiveSlide] = useState(0);
    const [containerWidth, setContainerWidth] = useState<number | undefined>();
    const [isResizing, setIsResizing] = useState(false);
    const containerRef = useRef<HTMLDivElement>()
    const onSetWidth = () => {
        const container = containerRef.current
        if (container) {
            setContainerWidth(container.clientWidth)
        }
    }

    useEffect(onSetWidth, [])

    // Set the container width on resize
    useEffect(() => {
        const resizingTimeout = latestTimeout(() => setIsResizing(false), 50)
        const onWindowResize = () => {
            onSetWidth()
            setIsResizing(true)
            resizingTimeout()
        }
        window.addEventListener('resize', onWindowResize)

        return () => {
            window.removeEventListener('resize', onWindowResize)
        }
    }, [])

    // Rotate slides every 5s
    useEffect(() => {
        const int = window.setTimeout(() => {
            const nextSlide = activeSlide === (slideCount - 1) ? 0 : activeSlide + 1
            setActiveSlide(nextSlide)
        }, 5000)

        return () => {
            window.clearTimeout(int)
        }
    }, [activeSlide])

    return (
        <div ref={containerRef} className="flex flex-col overflow-hidden space-y-4">
            {
                containerWidth !== undefined && (
                    <div className={classNames("flex relative overflow-hidden", props.className, {
                        'transition-[left] duration-500': !isResizing
                    })}
                        style={{
                            width: containerWidth * props.children.length,
                            left: 0 - (activeSlide * containerWidth)
                        }}
                    >
                        {
                            props.children
                        }
                    </div>
                )
            }
            {/* For first render */}
            {
                containerWidth === undefined && (
                    <div className="flex relative overflow-hidden">
                        {
                            props.children[activeSlide]
                        }
                    </div>
                )
            }
            <div className="flex space-x-1 self-center">
                {
                    props.children.map((_, i) => (
                        <div key={i} className={
                            classNames(
                                "rounded-full border w-2 h-2 cursor-pointer",
                                {
                                    'bg-orange-400': i === activeSlide,
                                    'bg-slate-400': i !== activeSlide
                                }
                            )
                        }
                            onClick={() => setActiveSlide(i)}
                        ></div>
                    ))
                }
            </div>
        </div>
    )
}