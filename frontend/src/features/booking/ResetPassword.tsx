import { useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { isAxiosError } from "axios";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import useGetIsResetTokenValid from "../../hooks/useGetIsResetTokenValid";
import ResetPasswordschema from "../../validation/ResetPasswordschema";
import ClipLoader from "../../components/ui/ClipLoader";
import AsyncButton from "../../components/ui/AsyncButton";
import { ResetPasswordType } from "../../utils/types";
import useUpdatePassword from "../../hooks/useUpdatePassword";

const ResetPassword = () => {

    const navigate = useNavigate();
    const { resetPasswordToken } = useParams();

    const {
        isLoading: isResetTokenValidLoading,
        isSuccess: isResetTokenValidSuccess,
        isError: isResetTokenValidError,
        error: errorIsResetTokenValid,
    } = useGetIsResetTokenValid(resetPasswordToken ? resetPasswordToken : "test");

    const {
        mutate: updatePassword,
        isLoading: isUpdatePasswordLoading,
        isSuccess: isUpdatePasswordSuccess,
        isError: isUpdatePasswordError,
        error: errorUpdatePassword,
    } = useUpdatePassword(resetPasswordToken ? resetPasswordToken : "test")

    const {
        register,
        handleSubmit,
        setError,
        formState: { errors },
    } = useForm<ResetPasswordType>({
        resolver: yupResolver(ResetPasswordschema),
    });

    const onSubmit: SubmitHandler<ResetPasswordType> = (data) => {
        const { password } = data;
        updatePassword({ password });
    };

    useEffect(() => {
        if (!isUpdatePasswordError) return
        if (!isAxiosError(errorUpdatePassword)) return
        if (!errorUpdatePassword.response) return
        if (!errorUpdatePassword.response.data.context) return
        if (!errorUpdatePassword.response.data.context.label) return

        setError(errorUpdatePassword.response.data.context.label, {
            message: errorUpdatePassword.response.data.message,
        })
    }, [setError, isUpdatePasswordError]);

    useEffect(() => {
        if (!isResetTokenValidError) return
        if (!isAxiosError(errorIsResetTokenValid)) return
        if (!errorIsResetTokenValid.response) return
        if (errorIsResetTokenValid.response.status !== 401) return
        navigate("/terminbuch/termine");
    }, [isResetTokenValidError]);

    if (isResetTokenValidLoading) {
        return (
            <main className={`booking-content small`}>
                <div className="dashboardCliploader">
                    <ClipLoader
                        color="rgb(209,213,219)"
                        size={70}
                        loading={true}
                    />
                </div>
            </main>
        )
    } else if (isResetTokenValidSuccess) {
        return (
            <main className={`booking-content small`}>
                <div className="pageHeader">
                    <div className="col-1-1">
                        <span className="pageHeaderCaption">
                            Passwort zurücksetzen
                        </span>
                    </div>
                </div>
                <div className="pageMaster">
                    <div className="page">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            {
                                !isUpdatePasswordSuccess &&
                                <div className="col-1-1">
                                    <span className="infoLabel">
                                        Geben Sie Ihr neues Passwort ein, um ihr Passwort zurückzusetzen.
                                    </span>
                                    <div className="bookingForm">
                                        <div className="bookingFormRow">
                                            <label
                                                htmlFor="resetPassword"
                                                className="bookingFormLabel"
                                            >
                                                Neues Passwort
                                            </label>
                                            <div className="bookingFormField">
                                                <div
                                                    className={`textfield${errors.password ? " error" : ""}`}
                                                >
                                                    <input
                                                        id="resetPassword"
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
                                        <div className="bookingFormRow">
                                            <label
                                                htmlFor="resetPasswordrepeat"
                                                className="bookingFormLabel"
                                            >
                                                Passwort wiederholen
                                            </label>
                                            <div className="bookingFormField">
                                                <div
                                                    className={`textfield${errors.passwordrepeat ? " error" : ""}`}
                                                >
                                                    <input
                                                        id="resetPasswordrepeat"
                                                        autoCapitalize="none"
                                                        type="password"
                                                        autoComplete="off"
                                                        maxLength={80}
                                                        {...register("passwordrepeat")}
                                                    />
                                                </div>
                                                {
                                                    errors.passwordrepeat &&
                                                    <span className="error-label" role="alert">
                                                        {errors.passwordrepeat.message}
                                                    </span>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            }
                            {
                                isUpdatePasswordSuccess &&
                                <div className="col-1-1">
                                    <span className="success-msg" role="alert">
                                        Passwort erfolgreich geändert. Zurück zu&nbsp;
                                        <Link
                                            to={"/terminbuch/termine"}
                                        >
                                            login
                                        </Link>
                                        .
                                    </span>
                                </div>
                            }
                            {
                                isUpdatePasswordError && isAxiosError(errorUpdatePassword) && errorUpdatePassword.response && errorUpdatePassword.response.data.context === undefined &&
                                <div className="col-1-1">
                                    <span className="error-msg" role="alert">
                                        Etwas ist schiefgelaufen. Versuchen Sie es später erneut.
                                    </span>
                                </div>
                            }
                            <div className="clear-row"></div>
                            <div className="col-1-1">
                                <button
                                    className="backButton bookingFormButton"
                                    type="button"
                                    onClick={() => navigate("/terminbuch/termine")}
                                >
                                    <span>Zurück</span>
                                </button>
                                <AsyncButton
                                    className="bookingFormButton"
                                    type="submit"
                                    isLoading={isUpdatePasswordLoading}
                                    disabled={isUpdatePasswordLoading || isUpdatePasswordSuccess}
                                >
                                    <span>Zurücksetzen</span>
                                </AsyncButton>
                                <div className="clear-row"></div>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="bookingFooter"></div>
            </main>
        )
    } else {
        return (
            <main className={`booking-content small`}>
                <div className="pageMaster">
                    <div className="page">
                        <div className="col-1-1">
                            <span className="infoLabel">
                                Automatische Weiterleitung zu&nbsp;
                                <Link
                                    to={"/terminbuch/termine"}
                                >
                                    Terminbuchung
                                </Link>
                            </span>
                        </div>
                    </div>
                </div>
            </main>
        )
    }
}

export default ResetPassword