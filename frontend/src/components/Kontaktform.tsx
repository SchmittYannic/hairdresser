import { Link } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import emailjs from "@emailjs/browser";

import ImageComponent from "src/components/ui/ImageComponent";
import { kontaktformular } from "src/assets";
import "src/components/Kontaktform.scss";
import { useState } from "react";
import AsyncButton from "./ui/AsyncButton";

type ContactFormDataType = {
    field_0: string,
    field_1: string,
    field_2: string,
    optin_field_0: boolean,
}

const Kontaktform = () => {

    const serviceId = String(import.meta.env.VITE_EMAILJS_SERVICE_ID);
    const templateId = String(import.meta.env.VITE_EMAILJS_TEMPLATE_ID);
    const publicKey = String(import.meta.env.VITE_EMAILJS_PUBLIC_KEY);

    const myEmail = String(import.meta.env.VITE_IMPRESSUM_EMAIL);

    const {
        register,
        handleSubmit,
        reset,
    } = useForm<ContactFormDataType>();

    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const onSubmit: SubmitHandler<ContactFormDataType> = async (data) => {
        setIsLoading(true);
        setIsError(false);
        setIsSuccess(false);

        try {
            const {
                field_0: name,
                field_1: email,
                field_2: message,
            } = data;

            await emailjs.send(
                serviceId,
                templateId,
                {
                    from_name: name,
                    to_name: "hairdresserSupport",
                    from_email: email,
                    to_email: myEmail,
                    subject: `message from ${name}`,
                    message: message
                },
                publicKey,
            );

            setIsLoading(false);
            reset({
                field_0: "",
                field_1: "",
                field_2: "",
                optin_field_0: false,
            });
            setIsSuccess(true);
        } catch (err) {
            setIsLoading(false);
            setIsError(true);
            setIsSuccess(false)
        }
    }

    return (
        <div id="c1954" className="col col-lg-6 col-sm-12 col-md-12">
            <ImageComponent
                id="m4169"
                className="module image"
                src={kontaktformular}
                alt="kontaktformular"
                loading="lazy"
                width="100%"
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
                onSubmit={handleSubmit(onSubmit)}
            >
                <div className="fields clear">
                    <div className="field w100">
                        <label htmlFor="m3435_field_0"></label>
                        <input
                            id="m3435_field_0"
                            type="text"
                            autoComplete="on"
                            placeholder="Ihr Name*"
                            required={true}
                            aria-required={true}
                            {...register("field_0")}
                        />
                    </div>
                    <div className="field w100">
                        <label htmlFor="m3435_field1"></label>
                        <input
                            id="m3435_field_1"
                            type="text"
                            autoComplete="email"
                            placeholder="Ihre Email-Adresse*"
                            required={true}
                            aria-required={true}
                            {...register("field_1")}
                        />
                    </div>
                    <div className="field w100">
                        <label htmlFor="m3435_field2"></label>
                        <textarea
                            id="m3435_field_2"
                            placeholder="Ihre Nachricht an uns (keine Terminanfragen)*"
                            required={true}
                            aria-required={true}
                            {...register("field_2")}
                        ></textarea>
                    </div>
                </div>
                <div className="optins clear">
                    <div className="field w100 optin">
                        <div className="form_option">
                            <input
                                id="m3435_optin_field_0"
                                type="checkbox"
                                value={1}
                                required
                                {...register("optin_field_0", { required: true })}
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
                <div id="errors_m3435">
                    {
                        isError && (
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
                        )
                    }
                    {
                        isSuccess && (
                            <span
                                className="success-msg"
                                role="alert"
                                style={{
                                    marginTop: "0.5rem",
                                    marginBottom: "0.5rem",
                                }}
                            >
                                Nachricht versendet.
                            </span>
                        )
                    }
                </div>
                <AsyncButton
                    className="button"
                    type="submit"
                    isLoading={isLoading}
                    disabled={isLoading}
                    style={{ position: "relative" }}
                >
                    Absenden
                </AsyncButton>
            </form>
        </div>
    )
}

export default Kontaktform