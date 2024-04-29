import { Link } from "react-router-dom"
import ImageSlider from "./ImageSlider"
import useWindowSize from "../hooks/useWindowSize"
import { teamgeist } from "../assets"
import { bookingpageSliderImgs } from "../constants"
import { insertSpace } from "../utils/functions"
import "./Bookingpage.scss"

const Bookingpage = () => {

    const windowSize = useWindowSize();
    const isLgScreen = windowSize.width && windowSize.width > 767 ? true : false;
    const phonenumber = String(import.meta.env.VITE_PHONENUMBER) ?? "000000000";

    return (
        <main id="bookingpage" className="row designRow">
            <div className="container w-full">
                <div className="col col-sm-12">
                    <div id="cta-section-bookingpage" className="row">
                        <div className="container container-fixed">
                            <div className="col col-sm-12">
                                <div id="m3775" className="module text">
                                    <h1 className="darkspottext text-center">
                                        Rund um die Uhr einen Termin buchen!
                                    </h1>
                                </div>
                                <div id="m4182" className="module divider"></div>
                                <div className="module text">
                                    <p className="text-center">
                                        Unabhängig von Öffnungszeiten.
                                    </p>
                                    <p className="text-center">
                                        Das geht ganz einfach über unsere Online Terminbuchung.
                                    </p>
                                    <p className="text-center">&nbsp;</p>
                                </div>
                                <Link
                                    id="cta-bookingpage"
                                    className="module button"
                                    role="button"
                                    to={"/terminbuch/termine"}
                                >
                                    <span>Jetzt Termin sichern</span>
                                </Link>
                                <div id="m1437" className="module text">
                                    <p className="text-center">
                                        <span>
                                            Selbstverständlich können Sie uns auch unter&nbsp;
                                        </span>
                                        <a className="tertiary-color" href={`tel:${phonenumber}`}>
                                            <span className="monoglobalWrap">
                                                {insertSpace(phonenumber)}
                                            </span>
                                        </a>
                                        <span className="monoglobalWrap">
                                            &nbsp;anrufen.
                                        </span>
                                    </p>
                                    <p className="text-center">&nbsp;</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div id="team-section-bookingpage" className="row">
                        <div className="container w-full">
                            <a
                                id="teamImg-bookingpage"
                                className="col col-md-6 col-lg-6 col-sm-12"
                                href="https://www.freepik.com/free-photo/people-taking-selfie-together-registration-day_18301092.htm"
                                target="_blank"
                                title="Image by freepik"
                            ></a>
                            <div
                                id="teamText-bookingpage"
                                className="col col-md-6 col-lg-6 col-sm-12"
                            >
                                <div className="module text">
                                    <h2 className="headline">Unser Team</h2>
                                </div>
                                <div id="m2872" className="module text">
                                    <p>
                                        <span className="bold">
                                            Sie sind besonders
                                        </span>
                                        &nbsp;- wir auch.
                                    </p>
                                    <p>&nbsp;</p>
                                    <p>
                                        Ihnen ein Lächeln ins Gesicht zu zaubern, das ist unser Anspruch. Wir lachen auch selbst viel und zwischendurch legen wir auch mal ein Tänzchen hin. Wir haben Spaß an dem, was wir tun. Und dabei stehen Sie und Ihre Haare im Mittelpunkt. Vertrauen Sie uns.
                                    </p>
                                </div>
                                <Link
                                    id="teamBtn-bookingpage"
                                    className="module button"
                                    role="button"
                                    to={"/team"}
                                >
                                    <span>
                                        Lernen Sie uns kennen
                                    </span>
                                </Link>
                                <img
                                    id="teamgeistImg"
                                    className="module image"
                                    src={teamgeist}
                                    alt="teamgeist"
                                />
                            </div>
                        </div>
                    </div>

                    <div id="images-section-bookingpage" className="row">
                        <div className="container w-full">
                            <div className="col col-sm-12">
                                <ImageSlider
                                    options={{
                                        amountperpage: 4,
                                        columns: isLgScreen ? 4 : 2,
                                        arrowbuttons: false,
                                        dotbuttons: false,
                                    }}
                                >
                                    {bookingpageSliderImgs.map((imgObj, idx) =>
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

export default Bookingpage