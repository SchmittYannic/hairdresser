import ImageSlider from "./ImageSlider"
import useWindowSize from "../hooks/useWindowSize"
import { colourpageSliderImgs } from "../constants"
import "./Colourpage.scss"

const Colourpage = () => {

    const windowSize = useWindowSize();
    const sliderImgsPerPage = windowSize.width && windowSize.width > 767 ? 3 : 1;

    return (
        <main id="colourpage" className="row designRow">
            <div className="container w-full">
                <div className="col col-sm-12">
                    <div id="r2831" className="row">
                        <div className="container w-full">
                            <div id="c4745" className="col col-sm-12">
                                <ImageSlider
                                    imgs={colourpageSliderImgs}
                                    amountperpage={sliderImgsPerPage}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default Colourpage