import { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { isAxiosError } from "axios";
import useSessionContext from "../../hooks/useSessionContext";
import useDeleteAccount from "../../hooks/useDeleteAccount";
import Dialog from "../../components/ui/Dialog";
import AsyncButton from "../../components/ui/AsyncButton";

const DeleteUser = () => {

    const { setActiveTab } = useSessionContext();
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

    const {
        mutate: triggerAccountDelete,
        isLoading: isDeleteAccountLoading,
        isError: isDeleteAccountError,
        error: errorDeleteAccount,
    } = useDeleteAccount();

    const {
        register,
        handleSubmit,
        setError,
        formState: { errors },
    } = useForm<{ password: string }>();

    const onSubmit: SubmitHandler<{ password: string }> = (data) => {
        const { password } = data;
        triggerAccountDelete({
            password,
        });
    };

    const handleBackButtonClicked = () => {
        setActiveTab("editUser");
    };

    const handleDeleteButtonClicked = () => {
        setIsDeleteDialogOpen(true);
    };

    const handleDeleteNoClicked = () => {
        setIsDeleteDialogOpen(false);
    };

    useEffect(() => {
        if (!isDeleteAccountError) return
        if (!isAxiosError(errorDeleteAccount)) return
        if (!errorDeleteAccount.response) return
        if (!errorDeleteAccount.response.data.context) return
        if (!errorDeleteAccount.response.data.context.label) return

        setError(errorDeleteAccount.response.data.context.label, {
            message: errorDeleteAccount.response.data.message,
        })
    }, [setError, isDeleteAccountError]);

    return (
        <div className="page">
            <div className="col-1-1">
                <span className="infoLabel">
                    Möchten Sie Ihr Konto unwiderruflich löschen?
                    <br />
                    Nach dem Löschen des Kontos können Sie sich nicht mehr anmelden. Ein Zugriff auf Ihre Termine ist nicht mehr möglich.
                </span>
            </div>
            <div className="col-1-1">
                <button
                    className="backButton bookingFormButton"
                    type="button"
                    onClick={handleBackButtonClicked}
                >
                    <span>Zurück</span>
                </button>
                <button
                    className="bookingFormButton"
                    type="button"
                    onClick={handleDeleteButtonClicked}
                >
                    Löschen
                </button>

            </div>
            <div className="clear-row"></div>
            {
                isDeleteDialogOpen && <Dialog setDialog={setIsDeleteDialogOpen}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="dialog__caption ">
                            Account löschen
                        </div>
                        <div className="dialog__content">
                            <span>
                                Bestätigen Sie Accountlöschung mit Ihrem Passwort
                            </span>
                            <div className="bookingFormRow">
                                <label
                                    htmlFor="deleteAccPasswort"
                                    className="bookingFormLabel"
                                >
                                    Passwort
                                </label>
                                <div className="bookingFormField">
                                    <div
                                        className={`textfield${errors.password ? " error" : ""}`}
                                    >
                                        <input
                                            id="deleteAccPasswort"
                                            autoCapitalize="none"
                                            type="password"
                                            maxLength={80}
                                            autoComplete="off"
                                            {...register("password", { required: "Bitte Ausfüllen", maxLength: 80 })}
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
                        </div>
                        {
                            isDeleteAccountError && isAxiosError(errorDeleteAccount) && errorDeleteAccount.response && errorDeleteAccount.response.data.context === undefined &&
                            <span className="error-msg" role="alert">
                                {errorDeleteAccount.response.data.message}
                            </span>
                        }
                        <div className="dialog__button__container">
                            <AsyncButton
                                className="bookingFormButton"
                                type="submit"
                                isLoading={isDeleteAccountLoading}
                                disabled={isDeleteAccountLoading}
                            >
                                <span>
                                    Bestätigen
                                </span>
                            </AsyncButton>
                            <button
                                className="bookingFormButton"
                                type="button"
                                onClick={handleDeleteNoClicked}
                            >
                                <span>
                                    Zurück
                                </span>
                            </button>
                        </div>
                    </form>
                </Dialog>
            }
        </div>
    )
}

export default DeleteUser