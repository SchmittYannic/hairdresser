import { Link } from "react-router-dom"
import { FaInstagram } from "react-icons/fa"
import ImageSlider from "./ImageSlider"
import useWindowSize from "../hooks/useWindowSize"
import { vorhernachher } from "../assets"
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

                    <div id="r2751" className="row">
                        <div className="container container-fixed">
                            <div className="col col-sm-12">
                                <div id="m4729" className="module text">
                                    <h1 className="darkspottext text-center">
                                        Farbe bei hairdresser
                                    </h1>
                                </div>
                                <div className="module text">
                                    <h2 className="preamble text-center">
                                        <strong>
                                            Wir erzielen glänzend schöne Farbergebnisse
                                        </strong>
                                    </h2>
                                </div>
                                <div id="m2314" className="module divider"></div>
                                <div className="module text">
                                    <p className="text-center">
                                        <span className="bold">
                                            Ob leuchtende Strähnen, natürliche Farbreflexe, blond oder rosa ... für Sie finden wir den Look, der zu Ihnen passt.
                                        </span>
                                    </p>
                                    <p className="text-center">&nbsp;</p>
                                    <p className="text-center">
                                        Wir bieten Ihnen Luxus für Ihr Haar - wir verwenden ausschließlich hochwertige Farben, die schonend Ihre Haare färben und auch für sensible Kopfhaut geeignet sind. Dabei setzen wir auf die aktuelle&nbsp;
                                        <a
                                            className="tertiary-color"
                                            href="http://colormebykm.com/"
                                            target="_blank"
                                        >
                                            COLOR.ME
                                        </a>
                                        &nbsp;Spitzenhaarfarbe von&nbsp;
                                        <a
                                            className="tertiary-color"
                                            href="http://de.kevinmurphy.com.au/"
                                            target="_blank"
                                        >
                                            KEVIN.MURPHY
                                        </a>
                                        . Erfahren Sie hier mehr über die&nbsp;
                                        <Link
                                            className="tertiary-color"
                                            to={"/salon"}
                                        >
                                            Produkte
                                        </Link>
                                        , die wir verwenden. Das ist Luxus für Ihr Haar.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div id="instagram-section-colourpage" className="row">
                        <div className="container w-full">
                            <a
                                id="instagramImg-colourpage"
                                className="col col-md-6 col-lg-6 col-sm-12"
                                href="https://www.freepik.com/free-photo/hairdresser-using-electric-trimmer-cutting-client39s-hair_27258635.htm#fromView=search&page=1&position=14&uuid=c0e9aa56-ca74-497d-a564-6d42eedc1330"
                                target="_blank"
                                title="Image by freepik"
                            ></a>
                            <div
                                id="instagramText-colourpage"
                                className="col col-md-6 col-lg-6 col-sm-12"
                            >
                                <div className="module text">
                                    <h2 className="headline">
                                        Colour
                                    </h2>
                                </div>
                                <div id="m2970" className="module text">
                                    <p>
                                        Klicken Sie sich doch gerne durch unsere&nbsp;
                                        <span className="bold">
                                            Instagram-Galerie.
                                        </span>
                                        &nbsp;Vielleicht erscheint auch bald Ihr Bild hier, wenn wir Sie happy gemacht haben.
                                    </p>
                                    <p className="bodytext">&nbsp;</p>
                                    <p className="bodytext">
                                        <strong>
                                            Überzeugen Sie sich von unserem Können!
                                        </strong>
                                    </p>
                                </div>
                                <a
                                    id="m1056"
                                    className="module button"
                                    href="https://www.instagram.com"
                                    target="_blank"
                                    title="Instagramprofil öffnen"
                                >
                                    <span className="icon-container">
                                        <FaInstagram aria-hidden />
                                    </span>
                                    &nbsp;
                                    <span>
                                        Zum Instagram-Profil
                                    </span>
                                </a>
                                <img
                                    id="vorhernachherImg-colourpage"
                                    className="module image"
                                    src={vorhernachher}
                                    alt="vorhernachher"
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