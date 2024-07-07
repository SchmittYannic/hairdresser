import { Link } from "react-router-dom"
import { FaInstagram, FaFacebookF, FaEnvelope } from "react-icons/fa"
import ImageComponent from "src/components/ui/ImageComponent"
import { besuch } from "src/assets"
import { insertSpace, isOpenNow } from "src/utils/functions"
import Kontaktform from "src/components/Kontaktform"
import "src/features/companywebsite/Kontaktpage.scss"

const Kontaktpage = () => {

    const phonenumber = String(import.meta.env.VITE_PHONENUMBER) ?? "000000000";
    const email = String(import.meta.env.VITE_EMAIL) ?? "musteraddress@mail.com";
    const instagram = String(import.meta.env.VITE_INSTAGRAM) ?? "https://www.instagram.com";
    const facebook = String(import.meta.env.VITE_FACEBOOK) ?? "https://www.facebook.com";

    const isShopOpen = isOpenNow();

    return (
        <main id="kontaktpage" className="row designRow">
            <div className="container w-full">
                <div className="col col-sm-12">
                    <div id="r1099" className="row">
                        <div className="container container-fixed">
                            <div className="col col-md-12 col-lg-12 col-sm-12">
                                <ImageComponent
                                    id="m3265"
                                    className="module image"
                                    src={besuch}
                                    alt="Wann lernen wir uns kennen?"
                                    loading="lazy"
                                    width="100%"
                                />
                            </div>
                        </div>
                    </div>

                    <div id="r1918" className="row">
                        <div className="container w-full">
                            <div id="c4159" className="col col-lg-3 col-md-6 col-sm-12">
                                <div id="m3960" className="module text">
                                    <h2 className="subtitle text-center">
                                        Terminbuchung online
                                    </h2>
                                </div>
                                <Link
                                    id="m1014"
                                    className="module button"
                                    role="button"
                                    to={"/terminbuch/termine"}
                                >
                                    <span>Jetzt Termin sichern</span>
                                </Link>
                            </div>
                            <div id="c3908" className="col col-lg-3 col-md-6 col-sm-12">
                                <div id="m4589" className="module text">
                                    <h2 className="subtitle text-center">
                                        Einfach anrufen
                                    </h2>
                                </div>
                                <a
                                    id="m3268"
                                    className="module button"
                                    role="button"
                                    href={`tel:${phonenumber}`}
                                >
                                    <span>{insertSpace(phonenumber)}</span>
                                </a>
                            </div>
                            <div id="c2267" className="col col-lg-3 col-md-6 col-sm-12">
                                <div id="m4591" className="module text">
                                    <h2 className="subtitle text-center">
                                        E-Mail schreiben
                                    </h2>
                                </div>
                                <a
                                    id="m1469"
                                    className="module button"
                                    role="button"
                                    href={`mailto:${email}`}
                                >
                                    <span className="icon-container">
                                        <FaEnvelope aria-hidden />
                                    </span>
                                </a>
                            </div>
                            <div id="c3427" className="col col-lg-3 col-md-6 col-sm-12 flexCol">
                                <div className="module autospacer"></div>
                                <div className="flexWrap">
                                    <div id="m2555" className="module text">
                                        <h2 className="subtitle text-center">
                                            Social Media
                                        </h2>
                                    </div>
                                    <ul id="m2093" className="module iconlist">
                                        <li>
                                            <a
                                                href={instagram}
                                                target="_blank"
                                                title="Instagramprofil öffnen"
                                            >
                                                <FaInstagram aria-hidden />
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                href={facebook}
                                                target="_blank"
                                                title="Facebookprofil öffnen"
                                            >
                                                <FaFacebookF aria-hidden />
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div id="r3309" className="row">
                        <div className="container w-full">
                            <Kontaktform />

                            <div id="c2107" className="col col-lg-6 col-sm-12 col-md-12">
                                <div id="m1398" className="module text">
                                    <h3 className="subtitle text-left">
                                        Unsere Öffnungszeiten
                                    </h3>
                                </div>
                                <div id="m3165" className="module opennow">
                                    {
                                        isShopOpen ?
                                            <span className="opened">
                                                Wir haben geöffnet!
                                            </span>
                                            :
                                            <span className="closed">
                                                Aktuell ist unser Salon geschlossen. Bitte beachten Sie unsere Öffnungszeiten.
                                            </span>
                                    }
                                </div>
                                <div id="m4503" className="module openinghours">
                                    <p className="day clear bodytext">
                                        <span className="dayLabel">Montag</span>
                                        <span className="ranges">
                                            <span>Ruhetag</span>
                                        </span>
                                    </p>
                                    <p className="day clear bodytext">
                                        <span className="dayLabel">Dienstag-Freitag</span>
                                        <span className="ranges">
                                            <span>08:30 - 18:00</span>
                                        </span>
                                    </p>
                                    <p className="day clear bodytext">
                                        <span className="dayLabel">Samstag</span>
                                        <span className="ranges">
                                            <span>08:00 - 13:00</span>
                                        </span>
                                    </p>
                                    <p className="subtitle specialDayTitle"></p>
                                </div>
                                <div className="module text">
                                    <p>
                                        Sie können gerne über unser&nbsp;
                                        <span className="bold">
                                            <Link
                                                style={{ display: "inline-flex" }}
                                                to={"/terminbuchung"}
                                            >
                                                Terminbuchungstool
                                            </Link>
                                            &nbsp;
                                        </span>
                                        oder&nbsp;
                                        <span className="bold">
                                            <a href={`tel:${phonenumber}`}>
                                                telefonisch
                                            </a>
                                            &nbsp;
                                        </span>
                                        einen Termin vereinbaren.
                                    </p>
                                </div>
                                <div id="m4530" className="module text">
                                    <p>
                                        Nutzen Sie bitte die öffentlichen Parkplätze an der Straße.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default Kontaktpage