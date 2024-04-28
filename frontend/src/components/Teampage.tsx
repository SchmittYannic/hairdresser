import { Link } from "react-router-dom"
import { hairdresserportrait1, hairdresserportrait2, hairdresserportrait3, teamgeist } from "../assets"
import "./Teampage.scss"

const Teampage = () => {
    return (
        <main id="teampage" className="row designRow">
            <div className="container w-full">
                <div className="col col-sm-12">
                    <a
                        href="https://www.freepik.com/free-photo/front-view-young-friends-hugging_5965451.htm"
                        target="_blank"
                        title="Image by freepik"
                    >
                        <div id="team-img-teampage" className="row"></div>
                    </a>

                    <div id="r2099" className="row">
                        <div className="container container-fixed">
                            <div className="col col-sm-12">
                                <div id="m4616" className="module text">
                                    <h1 className="darkspottext text-center">
                                        Das sind wir:
                                    </h1>
                                </div>
                                <div id="m2773" className="module divider"></div>
                            </div>
                        </div>
                    </div>

                    <div id="r2361" className="row">
                        <div className="container w-full">
                            <div id="c8802" className="col col-lg-3 col-md-6 col-sm-12">
                                <a
                                    className="image-container"
                                    href="https://unsplash.com/de/fotos/frau-in-weiss-blau-kariertem-hemd-jzz_3jWMzHA"
                                    target="_blank"
                                    title="Foto von Rivage auf Unsplash"
                                >
                                    <img
                                        id="m4701"
                                        className="module image"
                                        src={hairdresserportrait3}
                                        alt="Inhaberin Mirjam Schmid"
                                    />
                                </a>
                                <div id="m1845" className="module text">
                                    <h3 className="headline">
                                        Mirjam - Inhaberin
                                    </h3>
                                </div>
                                <div id="m3771" className="module text">
                                    <ul>
                                        <li>
                                            KEVIN.MURPHY Spezialistin
                                        </li>
                                        <li>
                                            Blow Dry
                                        </li>
                                        <li>
                                            Der perfekte Haarschnitt
                                        </li>
                                        <li>
                                            Klassisches und modisches Styling
                                        </li>
                                        <li>
                                            Tipps für zuhause
                                        </li>
                                    </ul>
                                </div>
                                <div id="m3474" className="module text">
                                    <p className="custom1">
                                        "Als Ladeninhaberin sorge ich für eine angenehme Atmosphäre und die permanente, trendorientierte Weiterbildung meines Teams."
                                    </p>
                                </div>
                            </div>
                            <div id="c2259" className="col col-lg-3 col-md-6 col-sm-12">
                                <a
                                    className="image-container"
                                    href="https://unsplash.com/de/fotos/frau-im-weissen-rundhalshemd-lachelnd-IF9TK5Uy-KI"
                                    target="_blank"
                                    title="Foto von Jake Nackos auf Unsplash"
                                >
                                    <img
                                        id="m2714"
                                        className="module image"
                                        src={hairdresserportrait1}
                                        alt="Nina Helm"
                                    />
                                </a>
                                <div id="m1846" className="module text">
                                    <h3 className="headline">
                                        Nina Helm
                                    </h3>
                                </div>
                                <div id="m2780" className="module text">
                                    <ul>
                                        <li>
                                            Educator/ Key für KEVIN.MURPHY COLOR.ME und SHOWPONY
                                        </li>
                                        <li>
                                            Balayage Spezialistin
                                        </li>
                                        <li>
                                            Haarverlängerung und Haarverdichtung
                                        </li>
                                        <li>
                                            Herrenhaarschnitte
                                        </li>
                                        <li>
                                            Brautstyling
                                        </li>
                                    </ul>
                                </div>
                                <div id="m1676" className="module text">
                                    <p className="custom1">
                                        "Mein Beruf ist meine Berufung. Bei mir ist man keine schnelle Nummer."
                                    </p>
                                </div>
                            </div>
                            <div id="c3154" className="col col-lg-3 col-md-6 col-sm-12">
                                <a
                                    className="image-container"
                                    href="https://www.freepik.com/free-photo/portrait-beautiful-young-woman-glasses-wearing-eyewear-smiling-looking-happy-trying-new_146536451.htm"
                                    target="_blank"
                                    title="Image by freepik"
                                >
                                    <img
                                        id="m2714"
                                        className="module image"
                                        src={hairdresserportrait2}
                                        alt="Hannah Geier"
                                    />
                                </a>
                                <div id="m4902" className="module text">
                                    <h3 className="headline">
                                        Hannah Geier
                                    </h3>
                                </div>
                                <div id="m4002" className="module text">
                                    <ul>
                                        <li>
                                            Farb und Strähnen Spezialistin
                                        </li>
                                        <li>
                                            Schnitte aller Art
                                        </li>
                                        <li>
                                            Naturlocken
                                        </li>
                                        <li>
                                            Flechtfrisuren und Braids
                                        </li>
                                    </ul>
                                </div>
                                <div id="m4757" className="module text">
                                    <p className="custom1">
                                        "Mein Beruf ist meine große Leidenschaft und ich liebe es wenn meine Kunden mit einen Lächeln gehen."
                                    </p>
                                </div>
                            </div>
                            <div id="c1398" className="col col-lg-3 col-md-6 col-sm-12">
                                <div className="flexWrap">
                                    <div id="m3074" className="module text">
                                        <h2 className="headline">
                                            Sie haben Lust, ein Teil unseres Teams zu werden?
                                        </h2>
                                    </div>
                                    <div id="m2160" className="module text">
                                        <p>
                                            <span className="bold">
                                                Dann bewerben Sie sich!
                                            </span>
                                        </p>
                                        <p>&nbsp;</p>
                                        <p>
                                            Wir sind immer auf der Suche nach kreativen und engagierten Köpfen.
                                        </p>
                                    </div>
                                    <Link
                                        id="m2357"
                                        className="module button"
                                        to={"/jobs"}
                                    >
                                        <span>
                                            Unsere Jobs
                                        </span>
                                    </Link>
                                </div>
                                <div className="module autospacer"></div>
                                <div className="flexWrap">
                                    <img
                                        id="m4734"
                                        className="module image"
                                        src={teamgeist}
                                        alt="teamgeist"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default Teampage