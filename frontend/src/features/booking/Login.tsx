import { useEffect } from "react";
import { isAxiosError } from "axios";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup"
import useSessionContext from "../../hooks/useSessionContext";
import useLogin from "../../hooks/useLogin";
import AsyncButton from "../../components/ui/AsyncButton";
import { LoginDataType } from "../../utils/types";
import Loginschema from "../../validation/Loginschema";

const Login = () => {

    const { setActiveTab, setIsCookieConsent } = useSessionContext();
    const { mutate, isLoading, isError, error: errorApi } = useLogin();

    const {
        register,
        handleSubmit,
        setError,
        formState: { errors },
    } = useForm<LoginDataType>({
        resolver: yupResolver(Loginschema),
    });

    const onSubmit: SubmitHandler<LoginDataType> = (data) => {
        mutate(data);
    };

    const isServerError = (isError && !isAxiosError(errorApi) || isError && isAxiosError(errorApi) && !errorApi.response);

    useEffect(() => {
        if (!isError) return
        if (!isAxiosError(errorApi)) return
        if (!errorApi.response) return
        if (!errorApi.response.data.context) return
        if (errorApi.response.data.context.key !== "email") return

        setError("email", {
            type: "emailNotFound",
            message: errorApi.response.data.message,
        })
    }, [setError, isError]);

    useEffect(() => {
        if (!isError) return
        if (!isAxiosError(errorApi)) return
        if (!errorApi.response) return
        if (!errorApi.response.data.context) return
        if (errorApi.response.data.context.key !== "password") return

        setError("password", {
            type: "passwortNoMatch",
            message: errorApi.response.data.message,
        })
    }, [setError, isError]);

    useEffect(() => {
        if (!isError) return
        if (!isAxiosError(errorApi)) return
        if (!errorApi.response) return
        if (!errorApi.response.data.context) return
        if (errorApi.response.data.context.key !== "cookieConsent") return

        setIsCookieConsent(false);
    }, [isError]);

    return (
        <div className="page">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="col-2-1">
                    <span className="captionLabel">
                        Sie sind bereits registriert?
                    </span>
                    <span className="infoLabel">
                        Dann melden Sie sich bitte hier mit Ihrer E-Mail-Adresse und dem Passwort an:
                    </span>
                    <div className="bookingForm">
                        <div className="bookingFormRow">
                            <label
                                htmlFor="loginEmail"
                                className="bookingFormLabel"
                            >
                                E-Mail-Adresse
                            </label>
                            <div className="bookingFormField">
                                <div className={`textfield${errors.email ? " error" : ""}`}>
                                    <input
                                        id="loginEmail"
                                        autoCapitalize="none"
                                        type="text"
                                        maxLength={80}
                                        {...register("email")}
                                    />
                                </div>
                                {
                                    errors.email &&
                                    <span className="error-label" role="alert">
                                        {errors.email.message}
                                    </span>
                                }
                            </div>
                        </div>
                        <div className="bookingFormRow">
                            <label
                                htmlFor="loginPassword"
                                className="bookingFormLabel"
                            >
                                Passwort
                            </label>
                            <div className="bookingFormField">
                                <div className={`textfield${errors.password ? " error" : ""}`}>
                                    <input
                                        id="loginPassword"
                                        autoCapitalize="none"
                                        type="password"
                                        autoComplete="on"
                                        maxLength={80}
                                        {...register("password")}
                                    />
                                </div>
                                {
                                    errors.password &&
                                    <span className="error-label" role="alert">
                                        {errors.password.message}
                                    </span>
                                }
                            </div>
                        </div>
                        <a
                            className="passwordForgottenLink"
                            href=""
                            onClick={(e) => {
                                e.preventDefault();
                                setActiveTab("reset");
                            }}
                        >
                            Passwort vergessen?
                        </a>
                        <div className="clear-row"></div>
                        {
                            isError && isAxiosError(errorApi) && errorApi.response && (errorApi.response.data.context === undefined || errorApi.response.data.context.key === "CookieConsent") &&
                            <span
                                className="error-msg"
                                role="alert"
                                style={{ margin: "15px auto" }}
                            >
                                {errorApi.response.data.message}
                            </span>
                        }
                        {
                            isServerError &&
                            <span
                                className="error-msg"
                                role="alert"
                                style={{ margin: "15px auto" }}
                            >
                                Etwas ist schiefgelaufen. Versuchen Sie es später erneut.
                            </span>
                        }
                        <AsyncButton
                            className="bookingFormButton"
                            type="submit"
                            isLoading={isLoading}
                            disabled={isLoading}
                        >
                            Anmelden
                        </AsyncButton>
                    </div>
                </div>
                <div className="col-2-2">
                    <span className="captionLabel">
                        Sie nutzen das Online-Terminbuch zum ersten Mal?
                    </span>
                    <span className="infoLabel">
                        Dann registrieren Sie sich bitte zunächst mit Ihrer E-Mail-Adresse und Handynummer. Ihre Vorteile:
                    </span>
                    <ul className="bullet-list">
                        <li>
                            Buchen und ändern Sie Ihre nächsten Termine in Ruhe vom Heim-PC oder mit dem Smartphone von unterwegs
                        </li>
                        <li>
                            Übersicht über Ihre aktuellen und vergangenen Termine
                        </li>
                        <li>
                            Terminerinnerung per E-Mail mit Übernahmemöglichkeit in Ihren Kalender - so vergessen Sie keinen Termin
                        </li>
                    </ul>
                    <div className="bookingForm">
                        <div className="buttonRow">
                            <button
                                className="bookingFormButton"
                                type="button"
                                onClick={() => setActiveTab("register")}
                            >
                                <span>Registrieren</span>
                            </button>
                        </div>
                    </div>
                </div>
                <div className="clear-row"></div>
            </form>
        </div>
    )
}

export default Login