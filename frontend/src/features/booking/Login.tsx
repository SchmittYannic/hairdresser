import { useEffect } from "react";
import { isAxiosError } from "axios";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup"
import { activeTabType } from "./Booking"
import useLogin from "../../hooks/useLogin";
import { LoginDataType } from "../../utils/types";
import Loginschema from "../../validation/Loginschema";

type LoginPropsType = {
    callback: React.Dispatch<React.SetStateAction<activeTabType>>;
}

const Login = ({ callback }: LoginPropsType) => {

    const { mutate, isLoading, isError, isSuccess, error: errorApi } = useLogin();

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

    useEffect(() => {
        if (!isError) return
        if (!isAxiosError(errorApi)) return
        if (!errorApi.response) return
        if (errorApi.response.data.key !== "email") return

        setError("email", {
            type: "emailNotFound",
            message: errorApi.response.data.message,
        })
    }, [setError, isError])

    useEffect(() => {
        if (!isError) return
        if (!isAxiosError(errorApi)) return
        if (!errorApi.response) return
        if (errorApi.response.data.key !== "password") return

        setError("password", {
            type: "passwortNoMatch",
            message: errorApi.response.data.message,
        })
    }, [setError, isError])

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
                            <span className="bookingFormLabel">
                                E-Mail-Adresse
                            </span>
                            <div className="bookingFormField">
                                <div className={`textfield${errors.email ? " error" : ""}`}>
                                    <input
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
                            <span className="bookingFormLabel">
                                Passwort
                            </span>
                            <div className="bookingFormField">
                                <div className={`textfield${errors.password ? " error" : ""}`}>
                                    <input
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
                                callback("reset");
                            }}
                        >
                            Passwort vergessen?
                        </a>
                        <button
                            className="bookingFormButton"
                            type="submit"
                            disabled={isLoading}
                        >
                            <span>Anmelden</span>
                        </button>
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
                                onClick={() => callback("register")}
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