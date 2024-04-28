import { heart } from "../assets"
import "./Jobspage.scss"

const Jobspage = () => {
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
                                            hairdresser
                                        </span>
                                        - Ihr Friseur in Würzburg
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
                </div>
            </div>
        </main>
    )
}

export default Jobspage