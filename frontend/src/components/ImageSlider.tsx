import { useRef, useState } from "react"
import { repeatArray, padArray } from "../utils/functions"
import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from "react-icons/md";
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
        imglist = padArray(amountperpage, imgs);
    }

    const ref = useRef<HTMLUListElement>(null);
    const [pageIndex, setPageIndex] = useState(1);
    const pagesCount = Math.ceil(imglist.length / amountperpage);
    const imgWidth = String(1 / amountperpage * 100) + "%";
    const transitionDuration = 300;
    const transitionStyle = `translate ${transitionDuration}ms ease-in-out`;

    const revertToStart = () => {
        if (!ref.current) return
        const list = ref.current;
        list.style.transition = "none";
        setPageIndex(1);
    }

    const skipToEnd = () => {
        if (!ref.current) return
        const list = ref.current;
        list.style.transition = "none";
        setPageIndex(pagesCount - 2);
    }

    const showPrevImgs = () => {
        if (!ref.current) return
        const list = ref.current;
        list.style.transition = transitionStyle;

        if (pageIndex === 1) {
            setPageIndex(0);
            setTimeout(() => {
                skipToEnd();
            }, transitionDuration);
        } else {
            setPageIndex(pageIndex - 1);
        }
    };

    const showNextImgs = () => {
        if (!ref.current) return
        const list = ref.current;
        list.style.transition = transitionStyle;

        if (pageIndex === pagesCount - 2) {
            setPageIndex(pagesCount - 1);
            setTimeout(() => {
                revertToStart();
            }, transitionDuration);
        } else {
            setPageIndex(pageIndex + 1);
        }
    };

    return (
        <div className="image-slider-container" aria-label="Image Slider">
            {
                amountperpage !== imgs.length && (
                    <a
                        className="skip-link"
                        href={"#after-image-slider-controls"}
                    >
                        Skip Image Slider Controls
                    </a>
                )
            }

            <ul
                ref={ref}
                className="image-slider-list"
                style={{ translate: `${-100 * pageIndex}%` }}
            >
                {imglist.map((img, idx) =>
                    <li
                        key={idx}
                        className="image-slider-item"
                        style={{ width: imgWidth }}
                        aria-hidden={`${pageIndex !== Math.floor(idx / amountperpage)}`}
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

            {
                amountperpage !== imgs.length && (
                    <>
                        <button
                            className="image-slider-arrowbtn left"
                            type="button"
                            title={`${amountperpage === 1 ? "Nächstes Bild" : "Nächste Bilder"}`}
                            aria-label={`${amountperpage === 1 ? "Nächstes Bild anzeigen" : "Nächste Bilder anzeigen"}`}
                            onClick={showPrevImgs}
                        >
                            <MdOutlineKeyboardArrowLeft aria-hidden />
                        </button>
                        <button
                            className="image-slider-arrowbtn right"
                            type="button"
                            title={`${amountperpage === 1 ? "Vorheriges Bild" : "Vorherige Bilder"}`}
                            aria-label={`${amountperpage === 1 ? "Vorheriges Bild anzeigen" : "Vorherige Bilder anzeigen"}`}
                            onClick={showNextImgs}
                        >
                            <MdOutlineKeyboardArrowRight aria-hidden />
                        </button>
                    </>
                )
            }
            <div id="after-image-slider-controls"></div>
        </div>
    )
}

export default ImageSlider