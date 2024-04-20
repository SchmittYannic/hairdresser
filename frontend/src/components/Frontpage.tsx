import { Link } from "react-router-dom"
import { FaPhone } from "react-icons/fa6"

const Frontpage = () => {
    return (
        <main id="frontpage" className="row designRow">
            <div className="container w-full">
                <div className="col col-sm-12">
                    <a href="https://www.freepik.com/free-photo/front-view-young-friends-hugging_5965451.htm" target="_blank" title="Image by freepik">
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
                                        <span className="secondary-color">
                                            <FaPhone />                                         
                                        </span>
                                        &nbsp;
                                        <span className="secondary-color">
                                            <a href="tel:000000000">
                                                <span className="monoglobalWrap">
                                                    00000 0000
                                                </span>
                                            </a>
                                        </span>
                                    </p>
                                    <p className="text-center">&nbsp;</p>
                                </div>

                                <div className="module text">
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
                </div>
            </div>
        </main>
    )
}

export default Frontpage