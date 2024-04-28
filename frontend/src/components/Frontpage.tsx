import { Link } from "react-router-dom"
import { FaPhone } from "react-icons/fa6"
import {
    showpony,
    kreativ,
    modern,
    professionell,
    heart,
    hairdresserportrait,
    hairproduct,
} from "../assets"
import "./Frontpage.scss"

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
                                <Link
                                    id="cta-frontpage"
                                    className="module button"
                                    to="/terminbuch/termine"
                                >
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
                                <div className="module text" style={{ marginBottom: "5px" }}>
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
                                            <FaPhone aria-hidden />
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

                    <div className="row">
                        <div className="container w-full">
                            <div id="layout-a-text3" className="col col-md-6 col-lg-6 col-sm-12">
                                <div className="module text">
                                    <h2 className="headline">
                                        Farbe
                                    </h2>
                                </div>
                                <div className="module text">
                                    <p>
                                        <span className="bold">
                                            Leuchtende Strähnen, natürliche Farbreflexe, blond oder rosa ... für Sie finden wir den Look, der zu Ihnen passt.
                                        </span>
                                    </p>
                                    <p>&nbsp;</p>
                                    <p>
                                        Wir bieten Ihnen Luxus für Ihr Haar. Dabei setzen wir auf hochwertige Farben, beispielsweise die aktuelle&nbsp;
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
                                        . Schonend für Ihr Haar und sensible Kopfhaut. Erfahren Sie hier mehr über die&nbsp;
                                        <Link
                                            className="tertiary-color"
                                            to={"/salon"}
                                        >
                                            Produkte
                                        </Link>
                                        , die wir verwenden.
                                    </p>
                                </div>
                                <Link
                                    className="module button"
                                    to={"/colour"}
                                >
                                    <span>Farbe in Bildern</span>
                                </Link>
                                <img
                                    id="modernImg"
                                    className="module image"
                                    src={modern}
                                    alt="modern"
                                />
                            </div>
                            <a
                                id="layout-a-image3"
                                className="col col-md-6 col-lg-6 col-sm-12"
                                href="https://unsplash.com/de/fotos/weisse-und-rosa-etikettierte-flaschen-Yo6tVaQHAho"
                                target="_blank"
                                title="Foto von Nick Scott auf Unsplash"
                            ></a>
                        </div>
                    </div>

                    <div className="row">
                        <div className="container w-full">
                            <a
                                id="layout-a-image4"
                                className="col col-md-6 col-lg-6 col-sm-12"
                                href="https://unsplash.com/de/fotos/foto-der-innenansicht-des-salons-PtOfbGkU3uI"
                                target="_blank"
                                title="Foto von Guilherme Petri auf Unsplash"
                            ></a>
                            <div id="layout-a-text4" className="col col-md-6 col-lg-6 col-sm-12">
                                <div className="module text">
                                    <h2 className="headline">
                                        Salon
                                    </h2>
                                </div>
                                <div className="module text">
                                    <p>
                                        <span className="bold">
                                            Ein Besuch bei uns ist mehr als nur ein Friseurtermin.
                                        </span>
                                    </p>
                                    <p>&nbsp;</p>
                                    <p>
                                        Deshalb geben wir alles, damit Sie sich bei uns wohlfühlen. Genießen Sie ihre kleine Auszeit - wir machen es Ihnen hübsch.
                                    </p>
                                </div>
                                <Link
                                    id="professionellBtn"
                                    className="module button"
                                    to={"/salon"}
                                >
                                    <span>Schauen Sie bei uns rein</span>
                                </Link>
                                <img
                                    id="professionellImg"
                                    className="module image"
                                    src={professionell}
                                    alt="professionell"
                                />
                            </div>
                        </div>
                    </div>

                    <div id="product-of-month-title-section" className="row">
                        <div className="container container-fixed">
                            <div className="col col-lg-6 col-sm-12 col-md-7">
                                <div className="module text">
                                    <h2 className="headline text-left">
                                        Unser Produkt des Monats
                                    </h2>
                                </div>
                                <div className="module text">
                                    <p className="subtitle">
                                        Kevin.Murphy - doo.over
                                    </p>
                                </div>
                            </div>
                            <div className="col col-lg-6 col-md-5 col-sm-12">
                                <img
                                    id="heartImg"
                                    className="module image"
                                    src={heart}
                                    alt="Herz"
                                />
                            </div>
                        </div>
                    </div>

                    <div id="product-of-month-section" className="row">
                        <div className="container container-fixed">
                            <div
                                id="pom-left-section"
                                className="col col-sm-12 col-lg-6 col-md-6"
                            >
                                <a
                                    href="https://unsplash.com/de/fotos/frau-im-weissen-rundhalshemd-lachelnd-IF9TK5Uy-KI"
                                    target="_blank"
                                    title="Foto von Jake Nackos auf Unsplash"
                                >
                                    <img
                                        id="hairdresserportraitImg"
                                        className="module image"
                                        src={hairdresserportrait}
                                        alt="hairdresser portrait"
                                    />
                                </a>
                                <div id="m1492" className="module text">
                                    <p>
                                        <span className="bold tertiary-color">
                                            Anna B.:
                                        </span>
                                        &nbsp;"Doo.Over ist perfekt für mich. Wenn's mal schnell gehen soll, ist Doo.Over für mich&nbsp;
                                        <span className="bold">
                                            "die Friseur aus der Dose"
                                        </span>
                                        . Aufgesprüht, kurz durchgestylt - und schon sitzt die Frisur wieder. Und das Spray duftet auch noch ganz toll. Ich mag's."
                                    </p>
                                </div>
                            </div>
                            <div
                                id="pom-right-section"
                                className="col col-sm-12 col-md-6 col-lg-6"
                            >
                                <a
                                    href="https://unsplash.com/de/fotos/eine-weisse-flasche-nagellack-LzcCJJcYvF8"
                                    target="_blank"
                                    title="Foto von Dmitry Vechorko auf Unsplash"
                                >
                                    <img
                                        id="pomImg"
                                        className="module image"
                                        src={hairproduct}
                                        alt="hairproduct"
                                    />
                                </a>
                                <Link
                                    id="pomBtn"
                                    className="module button"
                                    to={"/kontakt"}
                                >
                                    <span>Das möchte ich auch haben</span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default Frontpage