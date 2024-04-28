import { ChangeEvent, useRef } from "react"
import { bewerbung } from "../assets"
import "./Applicationform.scss"

const Applicationform = () => {

    const fileInputRef = useRef<HTMLInputElement>(null);
    const selectedFileText = useRef<HTMLSpanElement>(null);

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

    return (
        <div id="r4179" className="row">
            <div className="container w-full">
                <div className="col col-md-7 col-sm-12 col-lg-3 hidden-md hidden-sm"></div>
                <div id="c4379" className="col col-md-12 col-sm-12 col-lg-6">
                    <img
                        id="m1261"
                        className="module image"
                        src={bewerbung}
                        alt="Ihre Bewerbung"
                    />

                    <form
                        id="m2893"
                        className="module form"
                        method="post"
                        action="custom_form"
                        encType="multipart/form-data"
                        data-settings="margin=1"
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
                    </form>

                    <div id="m4148" className="module text">
                        <h3>
                            Auf Ihre Bewerbung über unser Bewerbungsformular freuen wir uns!
                        </h3>
                        <p>&nbsp;</p>
                        <p className="bold">hairdresser</p>
                        <p>Musterstraße. 5</p>
                        <p>97072 Würzburg</p>
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