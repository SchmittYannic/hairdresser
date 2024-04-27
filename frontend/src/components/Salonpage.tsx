import ImageSlider from "./ImageSlider"
import { salonpageSliderImgs1 } from "../constants"
import "./Salonpage.scss"

const Salonpage = () => {
    return (
        <main id="salonpage" className="row designRow">
            <div className="container w-full">
                <div className="col col-sm-12">
                    <div id="r3322">
                        <ImageSlider
                            options={{
                                arrowbuttons: false,
                                dotbuttons: true,
                                autoDelay: 8000,
                            }}
                        >
                            {salonpageSliderImgs1.map((imgObj, idx) =>
                                <a
                                    className="image-slider-link"
                                    key={idx}
                                    target="_blank"
                                    href={imgObj.href}
                                    title={imgObj.title}
                                    tabIndex={-1}
                                >
                                    <img
                                        className="image-slider-img"
                                        src={imgObj.src}
                                        alt={imgObj.alt}
                                    />
                                </a>
                            )}
                        </ImageSlider>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default Salonpage