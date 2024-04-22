import { stylingpageSliderImgs } from "../constants"
import ImageSlider from "./ImageSlider"
import useWindowSize from "../hooks/useWindowSize"
import "./Stylingpage.scss"

const Stylingpage = () => {

    const windowSize = useWindowSize();
    const sliderImgsPerPage = windowSize.width && windowSize.width > 767 ? 3 : 1;

    return (
        <main id="stylingpage" className="row designRow">
            <div className="container w-full">
                <div className="col col-sm-12">
                    <div id="images-section-stylingpage" className="row">
                        <div className="container w-full">
                            <div id="c5385" className="col col-sm-12">
                                <ImageSlider
                                    imgs={stylingpageSliderImgs}
                                    amountperpage={sliderImgsPerPage}
                                />
                            </div>
                        </div>
                    </div>

                    <div id="r1427" className="row">
                        <div className="container container-fixed">
                            <div className="col col-sm-12">
                                <div id="m2362" className="module text">
                                    <h1 className="darkspottext text-center">
                                        Styling bei hairdresser
                                    </h1>
                                </div>
                                <div className="module text">
                                    <h2 className="preamble text-center">
                                        <span className="bold">
                                            Man wird sich nach Ihnen umdrehen!
                                        </span>
                                    </h2>
                                </div>
                                <div id="m2618" className="module divider"></div>
                                <div className="module text">
                                    <p className="text-center">
                                        <span className="bold">
                                            Ob kurz oder lang, lockig oder glatt -&nbsp;
                                        </span>
                                        wir zaubern Ihre Traumfrisur.
                                    </p>
                                    <p className="text-center">&nbsp;</p>
                                    <p className="text-center">
                                        Sie stehen bei uns im Mittelpunkt. In unserer professionellen Typberatung besprechen wir Ihre Vorstellungen und Wünsche. Unseren Friseursalon verlassen Sie erst, wenn wir Sie glücklich gemacht haben.
                                    </p>
                                    <p className="text-center">&nbsp;</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default Stylingpage