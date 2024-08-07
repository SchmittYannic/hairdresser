import { ChangeEvent, FormEvent, useRef } from "react"
import { Link } from "react-router-dom"
import ImageComponent from "src/components/ui/ImageComponent"
import { bewerbung } from "src/assets"
import "src/components/Applicationform.scss"

const Applicationform = () => {

    const fileInputRef = useRef<HTMLInputElement>(null);
    const selectedFileText = useRef<HTMLSpanElement>(null);

    const shopname = String(import.meta.env.VITE_SHOPNAME) ?? "hairdresser";
    const city = String(import.meta.env.VITE_CITY) ?? "Würzburg";
    const plz = String(import.meta.env.VITE_PLZ) ?? "97072";
    const street = String(import.meta.env.VITE_STREET) ?? "Musterstr. 5";

    const noFileSelectedText = "Keine Datei ausgewählt";

    const handleSelectFileClicked = () => {
        if (!fileInputRef.current) return
        fileInputRef.current.click();
    };

    const handleFileInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (!selectedFileText.current) return
        const { target } = event;
        const el = selectedFileText.current;
        if (!target.files) {
            el.innerText = noFileSelectedText;
        } else {
            const fileCount = target.files.length;
            el.innerText = fileCount === 1 ? target.files[0].name : fileCount + " Dateien ausgewählt";
        }
    };

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
    }

    return (
        <div id="r4179" className="row">
            <div className="container w-full">
                <div className="col col-md-7 col-sm-12 col-lg-3 hidden-md hidden-sm"></div>
                <div id="c4379" className="col col-md-12 col-sm-12 col-lg-6">
                    <ImageComponent
                        id="m1261"
                        className="module image"
                        src={bewerbung}
                        alt="Ihre Bewerbung"
                        loading="lazy"
                        width="100%"
                    />

                    <form
                        id="m2893"
                        className="module form"
                        method="post"
                        action="custom_form"
                        encType="multipart/form-data"
                        data-settings="margin=1"
                        onSubmit={handleSubmit}
                    >
                        <div className="fields clear">
                            <div className="field w100">
                                <label htmlFor="m2893_field_0"></label>
                                <input
                                    id="m2893_field_0"
                                    type="text"
                                    name="field_0"
                                    autoComplete="on"
                                    placeholder="Name*"
                                    required={true}
                                    aria-required={true}
                                />
                            </div>
                            <div className="field w50">
                                <label htmlFor="m2893_field1"></label>
                                <input
                                    id="m2893_field_1"
                                    type="text"
                                    name="field_1"
                                    autoComplete="street-address"
                                    placeholder="Straße, Hausnummer*"
                                    required={true}
                                    aria-required={true}
                                />
                            </div>
                            <div className="field w50">
                                <label htmlFor="m2893_field2"></label>
                                <input
                                    id="m2893_field_2"
                                    type="text"
                                    name="field_2"
                                    autoComplete="street-address"
                                    placeholder="PLZ, Ort*"
                                    required={true}
                                    aria-required={true}
                                />
                            </div>
                            <div className="field w50">
                                <label htmlFor="m2893_field3"></label>
                                <input
                                    id="m2893_field_3"
                                    type="text"
                                    name="field_3"
                                    autoComplete="tel"
                                    placeholder="Telefon/Mobil*"
                                    required={true}
                                    aria-required={true}
                                />
                            </div>
                            <div className="field w50">
                                <label htmlFor="m2893_field4"></label>
                                <input
                                    id="m2893_field_4"
                                    type="text"
                                    name="field_4"
                                    autoComplete="email"
                                    placeholder="Email*"
                                    required={true}
                                    aria-required={true}
                                />
                            </div>
                            <div className="field w100">
                                <label htmlFor="m2893_field5"></label>
                                <input
                                    id="m2893_field_5"
                                    type="text"
                                    name="field_5"
                                    autoComplete="on"
                                    placeholder="Ich interessiere mich für eine Stelle als"
                                    required={true}
                                    aria-required={true}
                                />
                            </div>
                            <div className="field w100">
                                <label htmlFor="m2893_field6"></label>
                                <textarea
                                    id="m2893_field_6"
                                    name="field_6"
                                    placeholder="Ihre Nachricht an uns*"
                                    required={true}
                                    aria-required={true}
                                ></textarea>
                            </div>
                            <div className="field w100">
                                <label htmlFor="m2893_field7">
                                    Lebenslauf
                                </label>
                                <input
                                    ref={fileInputRef}
                                    id="m2893_field7"
                                    type="file"
                                    name="field_7[]"
                                    multiple={true}
                                    onChange={handleFileInputChange}
                                />
                                <div className="uploadWrapper">
                                    <button
                                        className="uploadBtn bold"
                                        type="button"
                                        onClick={handleSelectFileClicked}
                                    >
                                        Datei wählen
                                    </button>
                                    &nbsp;
                                    <span
                                        ref={selectedFileText}
                                        className="uploadText"
                                    >
                                        {noFileSelectedText}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="optins clear">
                            <div className="field w100 optin">
                                <div className="form_option">
                                    <input
                                        id="m2893_optin_field_0"
                                        type="checkbox"
                                        name="optin_field_0"
                                        value={1}
                                        required
                                    />
                                    <label
                                        className="label_optin_field_0"
                                        htmlFor="m2893_optin_field_0"
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
                        <div id="errors_m2893"></div>
                        <input className="button" type="submit" value="Bewerbung abschicken" />
                    </form>

                    <div id="m4148" className="module text">
                        <h3>
                            Auf Ihre Bewerbung über unser Bewerbungsformular freuen wir uns!
                        </h3>
                        <p>&nbsp;</p>
                        <p className="bold">{shopname}</p>
                        <p>{street}</p>
                        <p>{plz} {city}</p>
                        <p>&nbsp;</p>
                        <p>&nbsp;</p>
                    </div>
                </div>
                <div className="col col-md-7 col-sm-12 col-lg-3 hidden-md hidden-sm"></div>
            </div>
        </div>
    )
}

export default Applicationform