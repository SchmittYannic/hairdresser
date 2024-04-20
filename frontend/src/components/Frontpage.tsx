import { Link } from "react-router-dom"
import { FaPhone } from "react-icons/fa6"
import showpony from "../assets/showpony.png"
import kreativ from "../assets/kreativ.png"

const Frontpage = () => {
    return (
        <main id="frontpage" className="row designRow">
            <div className="container w-full">
                <div className="col col-sm-12">
                    <a 
                        href="https://www.freepik.com/free-photo/front-view-young-friends-hugging_5965451.htm"
                        target="_blank"
                        title="Image by freepik"
                    >
                        <div id="team-img" className="row"></div>
                    </a>

                    <div id="cta-section" className="row">
                        <div className="container container-fixed">
                            <div className="col col-sm-12">
                                <Link id="cta-frontpage" className="module button" to="/">
                                    <span>
                                        Jetzt Termin sichern
                                    </span>
                                </Link>
                            </div>
                        </div>
                    </div>

                    <div id="contact-section" className="row">
                        <div className="container container-fixed">
                            <div className="col col-sm-12">
                                <div className="module text" style={{marginBottom: "5px"}}>
                                    <p className="darkspottext text-center">
                                        Schön, dass Sie uns besuchen!
                                    </p>
                                </div>

                                <div className="module text">
                                    <h1 className="preamble text-center">
                                        <span className="bold">
                                            hairdresser
                                        </span>
                                        - Ihr Friseur in Würzburg
                                    </h1>
                                </div>

                                <div className="module divider"></div>

                                <div className="module text">
                                    <p className="text-center">
                                        Lernen Sie uns persönlich kennen und vereinbaren Sie gleich einen Termin.
                                    </p>
                                    <p className="text-center">&nbsp;</p>
                                    <p className="text-center">
                                        <span>
                                            <FaPhone />                                         
                                        </span>
                                        &nbsp;
                                        <span>
                                            <a className="tertiary-color" href="tel:000000000">
                                                <span className="monoglobalWrap">
                                                    00000 0000
                                                </span>
                                            </a>
                                        </span>
                                    </p>
                                    <p className="text-center">&nbsp;</p>
                                </div>

                                <div id="m1910" className="module text">
                                    <p className="bodytext text-center">
                                        Wir freuen uns auf Sie!
                                    </p>
                                    <p className="bodytext text-center">&nbsp;</p>
                                    <p className="bodytext text-center">
                                        Ihr Team von hairdresser
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div> 

                    <div className="row">
                        <div className="container w-full">
                            <div id="layout-a-text1" className="col col-md-6 col-lg-6 col-sm-12">
                                <div className="module text">
                                    <h2 className="headline">
                                        <span className="tertiary-color">
                                            <span className="bold">Neu:</span> Haarverlängerung oder Verdichtung
                                        </span>
                                    </h2>
                                </div>

                                <div className="module text">
                                    <p>
                                        <span className="bold">
                                            Willkommen in einer Welt der unbegrenzten Möglichkeiten
                                        </span>
                                    </p>
                                    <p>&nbsp;</p>
                                    <p>
                                        Showpony die neue Dimension der Haarverlängerung oder Verdichtung, die sich nahtlos uns unsichtbar in das natürliche Haar einfügt.
                                        <br />
                                        Die Skin Weft Tape Collection ist die unauffälligste Form der Haarverlängerung auf dem Markt.
                                        <br />
                                        &nbsp;
                                        <br />
                                        Wir zeigen Ihnen gerne die unbegrenzten Möglichkeiten und kreieren Ihnen das Haar, von dem Sie immer geträumt haben.
                                    </p>
                                </div>

                                <Link
                                    id="showponyBtn"
                                    className="module button"
                                    to={"/styling"}
                                >
                                    <span>Mehr Über Showpony</span>
                                </Link>

                                <img 
                                    id="showponyImg"
                                    className="module image"
                                    src={showpony}
                                    alt="showpony logo"
                                />
                            </div>

                            <a 
                                id="layout-a-image1"
                                className="col col-md-6 col-lg-6 col-sm-12"
                                href="https://www.freepik.com/free-photo/aloe-vera-cucumber-with-beauty-cream_4514527.htm"
                                target="_blank"
                                title="Image by freepik"
                            ></a>
                        </div>
                    </div>

                    <div className="row">
                        <div className="container w-full">
                            <a 
                                id="layout-a-image2"
                                className="col col-md-6 col-lg-6 col-sm-12"
                                href="https://unsplash.com/de/fotos/zwei-weisse-und-schwarz-etikettierte-flaschen-EekAcoEhYGU"
                                target="_blank"
                                title="Foto von Nick Scott auf Unsplash"
                            ></a>

                            <div id="layout-a-text2" className="col col-md-6 col-lg-6 col-sm-12">
                                <div className="module text">
                                    <h2 className="headline">Frisuren</h2>
                                </div>
                                <div id="m1824" className="module text">
                                    <p className="bodytext">
                                        <span className="bold">Ob kurz oder lang, lockig oder glatt</span> - Wir zaubern Ihre Traumfrisur.
                                    </p>
                                    <p className="bodytext">&nbsp;</p>
                                    <p className="bodytext">
                                        Sie stehen bei uns im Mittelpunkt. In unserer professionellen Typberatung besprechen wir Ihre Vorstellungen und Wünsche. Unseren Friseursalon verlassen Sie erst, wenn wir Sie glücklich gemacht haben.
                                    </p>
                                </div>
                                <Link
                                    id="kreativBtn"
                                    className="module button"
                                    to={"/styling"}
                                >
                                    <span>
                                        Vorher-/Nacher-Bilder
                                    </span>
                                </Link>
                                <img
                                    id="kreativImg"
                                    className="module image"
                                    src={kreativ}
                                    alt="kreativ"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default Frontpage