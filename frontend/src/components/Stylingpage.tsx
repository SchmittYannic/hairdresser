import { stylingpageSliderImgs } from "../constants"
import ImageSlider from "./ImageSlider"
import "./Stylingpage.scss"

const Stylingpage = () => {
    return (
        <main id="stylingpage" className="row designRow">
            <div className="container w-full">
                <div className="col col-sm-12">
                    <div id="images-section-stylingpage" className="row">
                        <div className="container w-full">
                            <div id="c5385" className="col col-sm-12">
                                <ImageSlider
                                    imgs={stylingpageSliderImgs}
                                    amountperpage={3}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default Stylingpage