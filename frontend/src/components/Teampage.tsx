import { Link } from "react-router-dom"
import Employee from "./Employee"
import { employees } from "../constants"
import { teamgeist } from "../assets"
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
                            {employees.map(employee =>
                                <Employee
                                    key={employee.id}
                                    employee={employee}
                                />
                            )}
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