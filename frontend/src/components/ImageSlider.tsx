import { useRef, useState } from "react"
import { repeatArray } from "../utils/functions"
import "./ImageSlider.scss"

type ImageSliderPropsType = {
    imgs: string[],
    amountperpage: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10,
}

const ImageSlider = ({ imgs, amountperpage }: ImageSliderPropsType) => {

    let imglist;
    if (imgs.length % amountperpage !== 0) {
        imglist = repeatArray(amountperpage, imgs);
    } else {
        imglist = imgs;
    }

    const ref = useRef<HTMLDivElement>(null);
    const [pageIndex, setPageIndex] = useState(0);
    const pagesCount = Math.ceil(imglist.length / amountperpage);
    const imgWidth = String(1/amountperpage * 100) + "%";

    const showPrevImgs = () => {
        setPageIndex((prev) => {
            if (prev === 0) return pagesCount - 1
            return prev - 1
        })
    };

    const showNextImgs = () => {
        setPageIndex((prev) => {
            if (prev === pagesCount - 1) return 0
            return prev + 1
        })
    };

    return (
        <div 
            ref={ref}
            className="image-slider-container"
        >
            <ul className="image-slider-list">
                {imglist.map((img, idx) => 
                    <li 
                        key={idx}
                        className="image-slider-item"
                        style={{
                            width: imgWidth,
                            flexGrow: 0,
                            flexShrink: 0,
                            // flexBasis: "0px",
                            translate: `${-100 * amountperpage * pageIndex}%`
                        }}
                    >
                        <img
                            className="image-slider-img"
                            src={img}
                            alt=""
                        />
                    </li>
                )}
            </ul>
            <button
                style={{
                    width: "50px",
                    height: "50px",
                }}
                onClick={showPrevImgs}
            >
                &lt;-
            </button>
            <button
                style={{
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