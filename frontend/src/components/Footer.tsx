import { Link } from "react-router-dom";
import { insertSpace } from "../utils/functions"
import "./Footer.scss"

const Footer = () => {

    const phonenumber = String(import.meta.env.VITE_PHONENUMBER) ?? "000000000";
    const email = String(import.meta.env.VITE_EMAIL) ?? "musteraddress@mail.com";

    return (
        <footer>
            <div id="r1138" className="row">
                <div className="container w-full">
                    <div id="c4127" className="col col-sm-12 col-md-12 col-lg-12">
                        <div className="module text">
                            <p className="footertext">
                                <span className="bold">hairdresser</span>
                                &nbsp;Mirjam Schmid | Musterstraße 5. | 97072 Würzburg | Tel. {insertSpace(phonenumber)} |&nbsp;
                                <a href={`mailto:${email}`}>{email}</a>
                            </p>
                        </div>
                        <div className="module text">
                            <p className="footertext">
                                <Link
                                    to={"/impressum"}
                                >
                                    Impressum
                                </Link>
                                &nbsp;|&nbsp;
                                <Link
                                    to={"/datenschutzerklaerung"}
                                >
                                    Datenschutzerklärung
                                </Link>
                                &nbsp;|&nbsp;
                                <Link
                                    to={"/kontakt"}
                                >
                                    Kontakt
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer