import { useEffect } from "react";
import { isAxiosError } from "axios";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup"
import useSessionContext from "../../hooks/useSessionContext";
import { EditUserType } from "../../utils/types";
import AsyncButton from "../../components/ui/AsyncButton";
import Edituserschema from "../../validation/Edituserschema";
import useUpdateUser from "../../hooks/useUpdateUser";

const EditUser = () => {

    const { userInfo, setActiveTab } = useSessionContext();

    const {
        mutate,
        isLoading,
        isError,
        isSuccess,
        error: errorApi,
        data: responseApi,
    } = useUpdateUser();

    const {
        register,
        handleSubmit,
        setError,
        formState: { errors },
    } = useForm<EditUserType>({
        resolver: yupResolver(Edituserschema),
    });

    const onSubmit: SubmitHandler<EditUserType> = (data) => {
        const {
            title,
            email,
            oldpassword,
            password,
            lastname,
            firstname,
            birthday,
            phonenumber,
            reminderemail,
            birthdayemail,
            newsletter,
        } = data;

        mutate({
            title,
            email,
            oldpassword,
            password,
            lastname,
            firstname,
            birthday,
            phonenumber,
            reminderemail,
            birthdayemail,
            newsletter,
        })
    }

    const isServerError = (isError && !isAxiosError(errorApi) || isError && isAxiosError(errorApi) && !errorApi.response);

    useEffect(() => {
        if (!isError) return
        if (!isAxiosError(errorApi)) return
        if (!errorApi.response) return
        if (!errorApi.response.data.context) return
        if (!errorApi.response.data.context.label) return

        setError(errorApi.response.data.context.label, {
            message: errorApi.response.data.message,
        })
    }, [setError, isError])

    return (
        <div className="page">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="col-2-1">
                    <span className="captionLabel">
                        Ihre Kontaktdaten
                    </span>
                    <div className="bookingForm">
                        <div className="bookingFormRow">
                            <span className="bookingFormLabel">
                                Anrede
                            </span>
                            <div className="bookingFormField">
                                <select
                                    id="genderSelectbox"
                                    className={`bookingSelectbox${errors.title ? " error" : ""}`}
                                    {...register("title")}
                                    defaultValue={userInfo.title}
                                >
                                    <option className="selectbox-item" value="Herr">
                                        Herr
                                    </option>
                                    <option className="selectbox-item" value="Frau">
                                        Frau
                                    </option>
                                    <option className="selectbox-item" value="Divers">
                                        Divers
                                    </option>
                                </select>
                                {
                                    errors.title &&
                                    <span id="genderSelectbox-error" className="error-label" role="alert">
                                        {errors.title.message}
                                    </span>
                                }
                            </div>
                        </div>
                        <div className="bookingFormRow">
                            <span className="bookingFormLabel">
                                Nachname
                            </span>
                            <div className="bookingFormField">
                                <div
                                    className={`textfield${errors.lastname ? " error" : ""}`}
                                >
                                    <input
                                        autoCapitalize="none"
                                        type="text"
                                        maxLength={80}
                                        {...register("lastname")}
                                        defaultValue={userInfo.lastname}
                                    />
                                </div>
                                {
                                    errors.lastname &&
                                    <span className="error-label" role="alert">
                                        {errors.lastname.message}
                                    </span>
                                }
                            </div>
                        </div>
                        <div className="bookingFormRow">
                            <span className="bookingFormLabel">
                                Vorname
                            </span>
                            <div className="bookingFormField">
                                <div
                                    className={`textfield${errors.firstname ? " error" : ""}`}
                                >
                                    <input
                                        autoCapitalize="none"
                                        type="text"
                                        maxLength={80}
                                        {...register("firstname")}
                                        defaultValue={userInfo.firstname}
                                    />
                                </div>
                                {
                                    errors.firstname &&
                                    <span className="error-label" role="alert">
                                        {errors.firstname.message}
                                    </span>
                                }
                            </div>
                        </div>
                        <div className="bookingFormRow">
                            <span className="bookingFormLabel">
                                Geburtstag
                            </span>
                            <div className="bookingFormField">
                                <div
                                    className={`textfield${errors.birthday ? " error" : ""}`}
                                >
                                    <input
                                        autoCapitalize="none"
                                        type="text"
                                        placeholder="tt.mm.jjjj"
                                        maxLength={10}
                                        {...register("birthday")}
                                    />
                                </div>
                                {
                                    errors.birthday &&
                                    <span className="error-label" role="alert">
                                        {errors.birthday.message}
                                    </span>
                                }
                            </div>
                        </div>
                        <div className="bookingFormRow">
                            <span className="bookingFormLabel">
                                E-Mail-Adresse
                            </span>
                            <div className="bookingFormField">
                                <div
                                    className={`textfield${errors.email ? " error" : ""}`}
                                >
                                    <input
                                        autoCapitalize="none"
                                        type="text"
                                        maxLength={80}
                                        {...register("email")}
                                        defaultValue={userInfo.email}
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
                                Handynummer
                            </span>
                            <div className="bookingFormField">
                                <div
                                    className={`textfield${errors.phonenumber ? " error" : ""}`}
                                >
                                    <input
                                        autoCapitalize="none"
                                        type="text"
                                        maxLength={80}
                                        {...register("phonenumber")}
                                        defaultValue={userInfo.phonenumber}
                                    />
                                </div>
                                {
                                    errors.phonenumber &&
                                    <span className="error-label" role="alert">
                                        {errors.phonenumber.message}
                                    </span>
                                }
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-2-2">
                    <span className="captionLabel">
                        Passwort ändern
                    </span>
                    <div className="bookingForm">
                        <div className="bookingFormRow">
                            <span className="bookingFormLabel">
                                Altes Passwort
                            </span>
                            <div className="bookingFormField">
                                <div
                                    className={`textfield${errors.oldpassword ? " error" : ""}`}
                                >
                                    <input
                                        autoCapitalize="none"
                                        type="password"
                                        maxLength={80}
                                        autoComplete="on"
                                        {...register("oldpassword")}
                                    />
                                </div>
                                {
                                    errors.oldpassword &&
                                    <span className="error-label" role="alert">
                                        {errors.oldpassword.message}
                                    </span>
                                }
                            </div>
                        </div>
                        <div className="bookingFormRow">
                            <span className="bookingFormLabel">
                                Neues Passwort
                            </span>
                            <div className="bookingFormField">
                                <div
                                    className={`textfield${errors.password ? " error" : ""}`}
                                >
                                    <input
                                        autoCapitalize="none"
                                        type="password"
                                        maxLength={80}
                                        autoComplete="on"
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
                            <span className="bookingFormLabel">
                                Passwort wiederholen
                            </span>
                            <div className="bookingFormField">
                                <div
                                    className={`textfield${errors.passwordrepeat ? " error" : ""}`}
                                >
                                    <input
                                        autoCapitalize="none"
                                        type="password"
                                        maxLength={80}
                                        autoComplete="on"
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
                <div className="col-2-2">
                    <span className="captionLabel">
                        Benachrichtigungen
                    </span>
                    <div className="bookingForm">
                        <div className="container">
                            <div className="newsletterCheckbox bookingCheckbox">
                                <input
                                    className="checkbox-cb"
                                    type="checkbox"
                                    {...register("reminderemail")}
                                    defaultChecked={userInfo.reminderemail}
                                />
                                <span className="bookingCheckbox-text">
                                    Ich möchte Terminerinnerungen per E-Mail erhalten.
                                </span>
                            </div>
                            <div className="clear-row"></div>
                            <div className="newsletterCheckbox bookingCheckbox">
                                <input
                                    className="checkbox-cb"
                                    type="checkbox"
                                    {...register("birthdayemail")}
                                    defaultChecked={userInfo.birthdayemail}
                                />
                                <span className="bookingCheckbox-text">
                                    Ich möchte Geburtstagswünsche per E-Mail erhalten.
                                </span>
                            </div>
                            <div className="clear-row"></div>
                            <div className="newsletterCheckbox bookingCheckbox">
                                <input
                                    className="checkbox-cb"
                                    type="checkbox"
                                    {...register("newsletter")}
                                    defaultChecked={userInfo.newsletter}
                                />
                                <span className="bookingCheckbox-text">
                                    Ich möchte Informationen von hairdresser per E-Mail erhalten.
                                </span>
                            </div>
                        </div>
                        <div className="container"></div>
                        <span className="deleteAccountLabel">
                            <a href="">
                                Konto löschen
                            </a>
                        </span>
                    </div>
                </div>
                <div className="clear-row"></div>
                {
                    isSuccess &&
                    <div className="col-1-1">
                        <span className="success-msg" role="alert">
                            {responseApi.message}
                        </span>
                    </div>
                }
                {
                    isServerError &&
                    <div className="col-1-1">
                        <span className="error-msg" role="alert">
                            Etwas ist schiefgelaufen. Versuchen Sie es später erneut.
                        </span>
                    </div>
                }
                <div className="col-1-1">
                    <button
                        className="backButton bookingFormButton"
                        type="button"
                        onClick={() => setActiveTab("dashboard")}
                    >
                        <span>Zurück</span>
                    </button>
                    <AsyncButton
                        className="contactSaveButton bookingFormButton"
                        type="submit"
                        isLoading={isLoading}
                    >
                        Speichern
                    </AsyncButton>
                    <div className="clear-row"></div>
                </div>
            </form>
        </div>
    )
}

export default EditUser