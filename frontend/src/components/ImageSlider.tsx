import {
    Children,
    Fragment,
    PropsWithChildren,
    useId,
    useRef,
    useState,
    HTMLAttributes,
} from "react"
import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from "react-icons/md";
import { splitArray, repeatArray, padArray } from "../utils/functions";
import "./ImageSlider.scss"

export type arrayChildrenType = (string | number | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal);

type OptionsType = {
    amountperpage?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10,
    columns?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10,
    rows?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10,
    arrowbuttons?: boolean,
    dotbuttons?: boolean,
};

const defaultOptions: OptionsType = {
    amountperpage: 1,
    columns: 1,
    rows: 1,
    arrowbuttons: true,
    dotbuttons: true,
};

const ImageSlider = ({
    children,
    options = defaultOptions,
    className = "",
    ...rest
}: PropsWithChildren<{ options?: OptionsType, className?: string } & Omit<HTMLAttributes<HTMLDivElement>, "className">>) => {

    const {
        amountperpage = 1,
        columns = amountperpage,
        rows = 1,
        arrowbuttons = true,
        dotbuttons = true,
    } = options;

    const arrayChildren: arrayChildrenType[] = Children.toArray(children);
    let sliderList;
    if (arrayChildren.length % amountperpage !== 0) {
        sliderList = padArray(repeatArray(arrayChildren, amountperpage), amountperpage);
    } else {
        sliderList = padArray(arrayChildren, amountperpage);
    }
    sliderList = splitArray(sliderList, amountperpage);

    const ref = useRef<HTMLUListElement>(null);
    const [pageIndex, setPageIndex] = useState(1);
    const afterImageSliderControlsId = useId();
    const pagesCount = sliderList.length;
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

    const showPrevPage = () => {
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

    const showNextPage = () => {
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

    const skipToPage = (index: number) => {
        if (!ref.current) return
        const list = ref.current;
        list.style.transition = transitionStyle;
        setPageIndex(index);
    };

    return (
        <div
            className={`image-slider-container ${className}`}
            aria-label="Image Slider"
            {...rest}
        >
            {
                (dotbuttons || arrowbuttons) && (
                    <a
                        className="skip-link"
                        href={`#${afterImageSliderControlsId}`}
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
                {sliderList.map((page, idx) =>
                    <li
                        key={idx}
                        aria-hidden={`${idx !== pageIndex}`}
                    >
                        <ul
                            className="image-slider-page"
                            style={{
                                gridTemplateColumns: `repeat(${columns}, 1fr)`,
                                gridTemplateRows: `repeat(${rows}, 1fr)`,
                            }}
                        >
                            {Array.isArray(page) && (page.map((pageItem, idx) =>
                                <li
                                    key={idx}
                                    className="image-slider-item"
                                >
                                    {pageItem}
                                </li>
                            ))}
                        </ul>
                    </li>
                )}
            </ul>

            {
                arrowbuttons && (
                    <>
                        <button
                            className="image-slider-arrowbtn left"
                            type="button"
                            onClick={showPrevPage}
                            title={`${amountperpage === 1 ? "Nächstes Bild" : "Nächste Bilder"}`}
                            aria-label={`${amountperpage === 1 ? "Nächstes Bild anzeigen" : "Nächste Bilder anzeigen"}`}
                        >
                            <MdOutlineKeyboardArrowLeft aria-hidden />
                        </button>

                        <button
                            className="image-slider-arrowbtn right"
                            type="button"
                            onClick={showNextPage}
                            title={`${amountperpage === 1 ? "Vorheriges Bild" : "Vorherige Bilder"}`}
                            aria-label={`${amountperpage === 1 ? "Vorheriges Bild anzeigen" : "Vorherige Bilder anzeigen"}`}
                        >
                            <MdOutlineKeyboardArrowRight aria-hidden />
                        </button>
                    </>
                )
            }

            {
                dotbuttons && (
                    <div className="image-slider-pagebtn-container">
                        {sliderList.map((_, idx) => {
                            const isActivePage = idx === pageIndex;
                            const isLastSkipPage = idx === 1 && pageIndex === pagesCount - 1;
                            const isFirstSkipPage = idx === sliderList.length - 2 && pageIndex === 0;
                            const isActive = isActivePage || isLastSkipPage || isFirstSkipPage;

                            return (
                                <Fragment key={idx}>
                                    {(idx !== 0 && idx !== sliderList.length - 1) && (
                                        <button
                                            className={`image-slider-pagebtn${isActive ? " active" : ""}`}
                                            type="button"
                                            onClick={() => skipToPage(idx)}
                                            title={`Spring zur Seite ${idx}`}
                                            aria-label={`Spring zur Seite ${idx}`}
                                        >
                                        </button>
                                    )}
                                </Fragment>
                            )
                        })}
                    </div>
                )
            }
            <div id={afterImageSliderControlsId}></div>
        </div>
    )
}

export default ImageSlider