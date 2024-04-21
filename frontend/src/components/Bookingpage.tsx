import { Link } from "react-router-dom"
import "./Bookingpage.scss"

const Bookingpage = () => {
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
                                        <a className="tertiary-color" href="tel:000000000">
                                            <span className="monoglobalWrap">
                                                00000 0000
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
                </div>
            </div>
        </main>
    )
}

export default Bookingpage