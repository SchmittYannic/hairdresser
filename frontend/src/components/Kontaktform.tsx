import { Link } from "react-router-dom"
import { kontaktformular } from "../assets"
import "./Kontaktform.scss"

const Kontaktform = () => {
    return (
        <div id="c1954" className="col col-lg-6 col-sm-12 col-md-12">
            <img
                id="m4169"
                className="module image"
                src={kontaktformular}
                alt="kontaktformular"
            />
            <div id="m2016" className="module text">
                <p>
                    Außerhalb der Geschäftszeiten können Sie uns auch eine E-Mail schreiben oder direkt über das Kontaktformular eine Nachricht an uns senden.
                </p>
            </div>
            <form
                id="m3435"
                className="module form"
                method="post"
                action="kontaktformular"
                data-settings="margin=1"
            >
                <div className="fields clear">
                    <div className="field w100">
                        <label htmlFor="m3435_field_0"></label>
                        <input
                            id="m3435_field_0"
                            type="text"
                            name="field_0"
                            autoComplete="on"
                            placeholder="Ihr Name*"
                            required={true}
                            aria-required={true}
                        />
                    </div>
                    <div className="field w100">
                        <label htmlFor="m3435_field1"></label>
                        <input
                            id="m3435_field_1"
                            type="text"
                            name="field_1"
                            autoComplete="email"
                            placeholder="Ihre Email-Adresse*"
                            required={true}
                            aria-required={true}
                        />
                    </div>
                    <div className="field w100">
                        <label htmlFor="m3435_field2"></label>
                        <textarea
                            id="m3435_field_2"
                            name="field_2"
                            placeholder="Ihre Nachricht an uns (keine Terminanfragen)*"
                            required={true}
                            aria-required={true}
                        ></textarea>
                    </div>
                </div>
                <div className="optins clear">
                    <div className="field w100 optin">
                        <div className="form_option">
                            <input
                                id="m3435_optin_field_0"
                                type="checkbox"
                                name="optin_field_0"
                                value={1}
                                required
                            />
                            <label
                                className="label_optin_field_0"
                                htmlFor="m3435_optin_field_0"
                            >
                                <Link
                                    className="optinLink"
                                    to={"/datenschutzerklaerung"}
                                >
                                    Wir verarbeiten Ihre eingegebenen personenbezogenen Daten ausschließlich zur Beantwortung Ihrer Anfrage. Weitere Informationen zum Datenschutz, insbesondere auch zu Ihren Rechten, finden Sie in unserer Datenschutzerklärung. *
                                </Link>
                            </label>
                        </div>
                    </div>
                </div>
                <div id="errors_m3435"></div>
                <input className="button" type="submit" value="Absenden" />
            </form>
        </div>
    )
}

export default Kontaktform