import { Link } from "react-router-dom"

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
                </div>
            </div>
        </main>
    )
}

export default Frontpage