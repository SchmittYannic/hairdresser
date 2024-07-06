import { heart } from "src/assets"
import { jobspageSliderImgs1 } from "src/constants"
import useWindowSize from "src/hooks/useWindowSize"
import Applicationform from "src/components/Applicationform"
import ImageSlider from "src/components/ImageSlider"
import "src/features/companywebsite/Jobspage.scss"

const Jobspage = () => {

    const windowSize = useWindowSize();
    const isLgScreen = windowSize.width && windowSize.width > 767 ? true : false;
    const city = String(import.meta.env.VITE_CITY) ?? "Würzburg";
    const shopname = String(import.meta.env.VITE_SHOPNAME) ?? "hairdresser";

    return (
        <main id="jobspage" className="row designRow">
            <div className="container w-full">
                <div className="col col-sm-12">
                    <a
                        href="https://www.freepik.com/free-photo/front-view-young-friends-hugging_5965451.htm"
                        target="_blank"
                        title="Image by freepik"
                    >
                        <div id="team-img-jobspage" className="row"></div>
                    </a>

                    <div id="r3643" className="row">
                        <div className="container container-fixed">
                            <div className="col col-sm-12">
                                <div id="m2260" className="module text">
                                    <h1 className="darkspottext text-center">
                                        Verstärken Sie unser Team!
                                    </h1>
                                </div>
                                <div className="module text">
                                    <p className="preamble text-center">
                                        <span className="bold">
                                            {shopname}
                                        </span>
                                        - Ihr Friseur in {city}
                                    </p>
                                </div>
                                <div id="m4165" className="module divider"></div>
                            </div>
                        </div>
                    </div>

                    <div id="r1680" className="row">
                        <div className="container container-fixed">
                            <div className="col col-sm-12">
                                <img
                                    id="m1995"
                                    className="module image"
                                    src={heart}
                                    alt="Herz"
                                />
                            </div>
                        </div>
                    </div>

                    <div id="r4866" className="row">
                        <div className="container w-full">
                            <div id="c1759" className="col col-md-6 col-lg-6 col-sm-12">
                                <div id="m2467" className="module text">
                                    <h2 className="headline text-left">
                                        Machen Sie mit bei uns
                                    </h2>
                                    <ul>
                                        <li className="bodytext">
                                            Auszubildende
                                        </li>
                                        <li className="bodytext">
                                            Praktikanten
                                        </li>
                                        <li className="bodytext">
                                            Friseure
                                        </li>
                                        <li className="bodytext">
                                            Friseurmeister
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div id="c3631" className="col col-md-6 col-lg-6 col-sm-12">
                                <div id="m2717" className="module text">
                                    <h2 className="headline text-left">
                                        Darauf können Sie sich freuen
                                    </h2>
                                    <ul>
                                        <li className="bodytext">
                                            ein modernes Arbeitsumfeld
                                        </li>
                                        <li className="bodytext">
                                            nette und erfahrene Kollegen
                                        </li>
                                        <li className="bodytext">
                                            Weiterbildungsmöglichkeiten und viel Raum für Kreativität
                                        </li>
                                        <li className="bodytext">
                                            faire Bezahlung
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>

                    <Applicationform />

                    <div id="r1490" className="row">
                        <div className="container w-full">
                            <div className="col col-sm-12">
                                <ImageSlider
                                    options={{
                                        amountperpage: 4,
                                        arrowbuttons: false,
                                        dotbuttons: false,
                                        columns: isLgScreen ? 4 : 2,
                                        rows: isLgScreen ? 1 : 2,
                                    }}
                                >
                                    {jobspageSliderImgs1.map((imgObj, idx) =>
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
                </div>
            </div>
        </main>
    )
}

export default Jobspage