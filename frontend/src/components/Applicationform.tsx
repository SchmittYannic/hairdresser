import { ChangeEvent, useRef } from "react"
import { Link } from "react-router-dom"
import { SubmitHandler, useForm } from "react-hook-form"
import { isAxiosError } from "axios";

import useSaveNewApplication from "src/hooks/useSaveNewApplication"
import ImageComponent from "src/components/ui/ImageComponent"
import AsyncButton from "src/components/ui/AsyncButton"
import { bewerbung } from "src/assets"
import { ApplicationDataType } from "src/utils/types"
import "src/components/Applicationform.scss"

const Applicationform = () => {

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ApplicationDataType>();

    const {
        mutate,
        isLoading,
        isError,
        isSuccess,
        error: errorApi,
        data: responseApi,
    } = useSaveNewApplication();

    const isServerError = (isError && !isAxiosError(errorApi) || isError && isAxiosError(errorApi) && !errorApi.response);

    const selectedFileText = useRef<HTMLSpanElement>(null);

    const shopname = String(import.meta.env.VITE_SHOPNAME) ?? "hairdresser";
    const city = String(import.meta.env.VITE_CITY) ?? "Würzburg";
    const plz = String(import.meta.env.VITE_PLZ) ?? "97072";
    const street = String(import.meta.env.VITE_STREET) ?? "Musterstr. 5";

    const noFileSelectedText = "Keine Datei ausgewählt";

    const onSubmit: SubmitHandler<ApplicationDataType> = (data) => {
        mutate(data);
    };

    const handleSelectFileClicked = () => {
        document.getElementById("m2893_field7")?.click();
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
                        onSubmit={handleSubmit(onSubmit)}
                    >
                        <div className="fields clear">
                            <div className="field w100">
                                <label htmlFor="m2893_field_0"></label>
                                <input
                                    id="m2893_field_0"
                                    type="text"
                                    autoComplete="on"
                                    placeholder="Name*"
                                    maxLength={80}
                                    required={true}
                                    aria-required={true}
                                    {...register("field_0")}
                                />
                            </div>
                            <div className="field w50">
                                <label htmlFor="m2893_field1"></label>
                                <input
                                    id="m2893_field_1"
                                    type="text"
                                    autoComplete="street-address"
                                    placeholder="Straße, Hausnummer*"
                                    maxLength={80}
                                    required={true}
                                    aria-required={true}
                                    {...register("field_1")}
                                />
                            </div>
                            <div className="field w50">
                                <label htmlFor="m2893_field2"></label>
                                <input
                                    id="m2893_field_2"
                                    type="text"
                                    autoComplete="street-address"
                                    placeholder="PLZ, Ort*"
                                    maxLength={80}
                                    required={true}
                                    aria-required={true}
                                    {...register("field_2")}
                                />
                            </div>
                            <div className="field w50">
                                <label htmlFor="m2893_field3"></label>
                                <input
                                    id="m2893_field_3"
                                    type="text"
                                    autoComplete="tel"
                                    placeholder="Telefon/Mobil*"
                                    maxLength={80}
                                    required={true}
                                    aria-required={true}
                                    {...register("field_3")}
                                />
                            </div>
                            <div className="field w50">
                                <label htmlFor="m2893_field4"></label>
                                <input
                                    id="m2893_field_4"
                                    type="text"
                                    autoComplete="email"
                                    placeholder="Email*"
                                    maxLength={80}
                                    required={true}
                                    aria-required={true}
                                    {...register("field_4")}
                                />
                            </div>
                            <div className="field w100">
                                <label htmlFor="m2893_field5"></label>
                                <input
                                    id="m2893_field_5"
                                    type="text"
                                    autoComplete="on"
                                    placeholder="Ich interessiere mich für eine Stelle als"
                                    maxLength={80}
                                    required={true}
                                    aria-required={true}
                                    {...register("field_5")}
                                />
                            </div>
                            <div className="field w100">
                                <label htmlFor="m2893_field6"></label>
                                <textarea
                                    id="m2893_field_6"
                                    placeholder="Ihre Nachricht an uns*"
                                    maxLength={250}
                                    required={true}
                                    aria-required={true}
                                    {...register("field_6")}
                                ></textarea>
                            </div>
                            <div className="field w100">
                                <label htmlFor="m2893_field7">
                                    Lebenslauf
                                </label>
                                <input
                                    id="m2893_field7"
                                    type="file"
                                    multiple={true}
                                    {...register("field_7", {
                                        onChange: handleFileInputChange,
                                        required: "Mindestens eine Datei ist erforderlich",
                                    })}
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
                                {
                                    errors.field_7 &&
                                    <span className="error-label text-left" role="alert">
                                        {errors.field_7.message}
                                    </span>
                                }
                            </div>
                        </div>
                        <div className="optins clear">
                            <div className="field w100 optin">
                                <div className="form_option">
                                    <input
                                        id="m2893_optin_field_0"
                                        type="checkbox"
                                        value={0}
                                        required
                                        {...register("optin_field_0", { required: true })}
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
                        <div id="errors_m2893">
                            {
                                isSuccess &&
                                <span
                                    className="success-msg"
                                    role="alert"
                                    style={{
                                        marginTop: "0.5rem",
                                        marginBottom: "0.5rem",
                                    }}
                                >
                                    {responseApi.message}
                                </span>
                            }
                            {
                                isError && isAxiosError(errorApi) && errorApi.response && (errorApi.response.data.context === undefined || errorApi.response.data.context.key === "CookieConsent") &&
                                <span
                                    className="error-msg"
                                    role="alert"
                                    style={{
                                        marginTop: "0.5rem",
                                        marginBottom: "0.5rem",
                                    }}
                                >
                                    {errorApi.response.data.message}
                                </span>

                            }
                            {
                                isServerError &&
                                <span
                                    className="error-msg"
                                    role="alert"
                                    style={{
                                        marginTop: "0.5rem",
                                        marginBottom: "0.5rem",
                                    }}
                                >
                                    Etwas ist schiefgelaufen. Versuchen Sie es später erneut.
                                </span>
                            }
                        </div>
                        <AsyncButton
                            className="button"
                            type="submit"
                            isLoading={isLoading}
                            disabled={isLoading}
                            style={{ position: "relative" }}
                        >
                            Bewerbung abschicken
                        </AsyncButton>
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