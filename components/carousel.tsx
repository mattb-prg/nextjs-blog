import { FC, ReactNode, useEffect, useRef, useState } from "react";
import classnames from 'classnames';

interface ICarouselProps {
    children: ReactNode[]
    className?: string
}
export const Carousel: FC<ICarouselProps> = (props) => {
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
    useEffect(onSetWidth)

    useEffect(() => {
        let timeout: number
        const onWindowResize = () => {
            window.clearTimeout(timeout)
            onSetWidth()
            setIsResizing(true)
            timeout = window.setTimeout(() => {
                setIsResizing(false)
            }, 100)
        }
        window.addEventListener('resize', onWindowResize)

        return () => {
            window.removeEventListener('resize', onWindowResize)
        }
    }, [])

    return (
        <div ref={containerRef} className="flex flex-col items-center overflow-hidden space-y-4">
            {
                containerWidth !== undefined && (
                    <div className={classnames("flex relative overflow-hidden", props.className, {
                        'transition-[left] duration-500': !isResizing
                    })}
                        style={{
                            width: containerWidth * props.children.length,
                            left: (containerWidth / 2) - (activeSlide * containerWidth)
                        }}
                    >
                        {
                            containerWidth !== undefined && props.children.map((child, i) => {
                                return (
                                    <div className='w-full'>
                                        {child}
                                    </div>
                                )
                            })
                        }
                    </div>
                )
            }
            <div className="flex space-x-1">
                {
                    props.children.map((_, i) => {
                        return (
                            <div className={
                                classnames(
                                    "rounded-full border w-2 h-2 bg-slate-400 cursor-pointer",
                                    {
                                        'bg-orange-400': i === activeSlide
                                    }
                                )
                            }
                                onClick={() => setActiveSlide(i)}
                            ></div>
                        )
                    })
                }
            </div>
        </div>
    )
}