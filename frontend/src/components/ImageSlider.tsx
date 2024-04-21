import { useRef, useState } from "react"
import { repeatArray, padArray } from "../utils/functions"
import "./ImageSlider.scss"

export type SliderImgsType = {
    id: number,
    src: string,
    alt: string,
    title: string,
};

type ImageSliderPropsType = {
    imgs: SliderImgsType[],
    amountperpage: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10,
}

const ImageSlider = ({ imgs, amountperpage }: ImageSliderPropsType) => {

    let imglist;
    if (imgs.length % amountperpage !== 0) {
        imglist = padArray(amountperpage, repeatArray(amountperpage, imgs));
    } else {
        imglist = imgs;
    }

    const ref = useRef<HTMLDivElement>(null);
    const [pageIndex, setPageIndex] = useState(1);
    const pagesCount = Math.ceil(imglist.length / amountperpage);
    const imgWidth = String(1/amountperpage * 100) + "%";

    const revertToStart = () => {
        const list = document.querySelector(".image-slider-list") as HTMLElement;
        list.style.transition = "none";
        setPageIndex(1);
    }

    const skipToEnd = () => {
        const list = document.querySelector(".image-slider-list") as HTMLElement;
        list.style.transition = "none";
        setPageIndex(pagesCount - 2);
    }

    const showPrevImgs = () => {
        const list = document.querySelector(".image-slider-list") as HTMLElement;
        list.style.transition = "translate 300ms ease-in-out";

        if (pageIndex === 1) {
            setPageIndex(0);
            setTimeout(() => {
                skipToEnd();
            }, 300);
        } else {
            setPageIndex(pageIndex - 1);
        }
    };

    const showNextImgs = () => {
        const list = document.querySelector(".image-slider-list") as HTMLElement;
        list.style.transition = "translate 300ms ease-in-out";

        if (pageIndex === pagesCount - 2) {
            setPageIndex(pagesCount - 1);
            setTimeout(() => {
                revertToStart();
            }, 300);
        } else {
            setPageIndex(pageIndex + 1);
        }
    };

    return (
        <div 
            ref={ref}
            className="image-slider-container"
        >           
            <ul className="image-slider-list"
                style={{
                    translate: `${-100 * pageIndex}%`,
                    transition: "translate 300ms ease-in-out",
                }}
            >
                {imglist.map((img, idx) => 
                    <li 
                        key={idx}
                        className="image-slider-item"
                        style={{
                            width: imgWidth,
                            flexGrow: 0,
                            flexShrink: 0,
                        }}
                    >
                        <img
                            className="image-slider-img"
                            src={img.src}
                            alt={img.alt}
                            title={img.title}
                        />
                    </li>
                )}
            </ul>         
            <button
                style={{
                    position: "absolute",
                    top: "50%",
                    left: "0",
                    width: "50px",
                    height: "50px",
                }}
                onClick={showPrevImgs}
            >
                &lt;-
            </button>
            <button
                style={{
                    position: "absolute",
                    top: "50%",
                    right: "0",
                    width: "50px",
                    height: "50px",
                }}
                onClick={showNextImgs}
            >
                -&rt;
            </button>
        </div>
    )
}

export default ImageSlider