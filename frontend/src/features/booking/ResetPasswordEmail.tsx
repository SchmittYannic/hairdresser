import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { isAxiosError } from "axios";
import useSessionContext from "../../hooks/useSessionContext";
import useResetPasswordEmail from "../../hooks/useResetPasswordEmail";
import ResetPasswordEmailschema from "../../validation/ResetPasswordEmailschema";
import AsyncButton from "../../components/ui/AsyncButton";

const ResetPasswordEmail = () => {

    const { setActiveTab } = useSessionContext();

    const {
        mutate: triggerResetPasswordEmail,
        isLoading: isResetPasswordLoading,
        isSuccess: isResetPasswordSuccess,
        isError: isResetPasswordError,
        error: errorResetPassword,
        data: dataResetPassword,
        reset: resetResetPasswordMutation,
    } = useResetPasswordEmail();

    const {
        register,
        handleSubmit,
        setError,
        formState: { errors },
        reset: resetForm,
    } = useForm<{ email: string }>({
        resolver: yupResolver(ResetPasswordEmailschema),
    });

    const onSubmit: SubmitHandler<{ email: string }> = (data) => {
        triggerResetPasswordEmail(data);
    };

    useEffect(() => {
        if (!isResetPasswordError) return
        if (!isAxiosError(errorResetPassword)) return
        if (!errorResetPassword.response) return
        if (!errorResetPassword.response.data.context) return
        if (!errorResetPassword.response.data.context.label) return

        setError(errorResetPassword.response.data.context.label, {
            message: errorResetPassword.response.data.message,
        })
    }, [setError, isResetPasswordError]);

    useEffect(() => {
        if (!isResetPasswordSuccess) return
        resetForm({
            email: "",
        })
    }, [isResetPasswordSuccess]);

    return (
        <div className="page">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="col-1-1">
                    <span className="infoLabel">
                        Wenn Sie Ihr Passwort nicht mehr wissen, können Sie es hier zurücksetzen. Geben Sie dazu Ihre E-Mail-Adresse ein.
                    </span>
                    <div className="bookingForm">
                        <div className="bookingFormRow">
                            <label
                                htmlFor="resetEmail"
                                className="bookingFormLabel"
                            >
                                E-Mail-Adresse
                            </label>
                            <div className="bookingFormField">
                                <div
                                    className={`textfield${errors.email ? " error" : ""}`}
                                >
                                    <input
                                        id="resetEmail"
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
                    </div>
                </div>
                {
                    isResetPasswordSuccess &&
                    <div className="col-1-1">
                        <span className="success-msg" role="alert">
                            {dataResetPassword.message}
                        </span>
                    </div>
                }
                {
                    isResetPasswordError && isAxiosError(errorResetPassword) && errorResetPassword.response && errorResetPassword.response.data.context === undefined &&
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
                        onClick={() => setActiveTab("login")}
                    >
                        <span>Zurück</span>
                    </button>
                    <AsyncButton
                        className="bookingFormButton"
                        type="submit"
                        onClick={() => resetResetPasswordMutation()}
                        isLoading={isResetPasswordLoading}
                        disabled={isResetPasswordLoading}
                    >
                        <span>Zurücksetzen</span>
                    </AsyncButton>
                    <div className="clear-row"></div>
                </div>
            </form>
        </div>
    )
}

export default ResetPasswordEmail