import { MouseEvent, useEffect } from "react"
import { useForm, SubmitHandler } from "react-hook-form"
import { isAxiosError } from "axios";
import { yupResolver } from "@hookform/resolvers/yup"
import useSessionContext from "../../hooks/useSessionContext";
import AsyncButton from "../../components/ui/AsyncButton";
import useCreateNewUser from "../../hooks/useCreateNewUser"
import Registerschema from "../../validation/Registerschema"
import { UserDataType } from "../../utils/types";

const Register = () => {
    const { activeTab, setActiveTab } = useSessionContext()

    const {
        mutate,
        isLoading,
        isError,
        isSuccess,
        error: errorApi,
        data: responseApi,
    } = useCreateNewUser();

    const {
        register,
        handleSubmit,
        setError,
        formState: { errors },
    } = useForm<UserDataType>({
        resolver: yupResolver(Registerschema),
    });

    const onSubmit: SubmitHandler<UserDataType> = (data) => {
        const {
            title,
            lastname,
            firstname,
            birthday,
            email,
            phonenumber,
            password,
            reminderemail,
            birthdayemail,
            newsletter,
        } = data;

        const parts = birthday.split(".");
        const birthdayAsDate = new Date(parseInt(parts[2], 10),
            parseInt(parts[1], 10) - 1,
            parseInt(parts[0], 10));

        mutate({
            title,
            lastname,
            firstname,
            birthday: birthdayAsDate,
            email,
            phonenumber,
            password,
            reminderemail,
            birthdayemail,
            newsletter,
        });
    };

    const isServerError = (isError && !isAxiosError(errorApi) || isError && isAxiosError(errorApi) && !errorApi.response);

    const handleAGBClicked = (e: MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        setActiveTab("agb");
    }

    const handleLoginClicked = (e: MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        setActiveTab("login");
    }

    useEffect(() => {
        if (!isError) return
        if (!isAxiosError(errorApi)) return
        if (!errorApi.response) return
        if (!errorApi.response.data.context) return
        if (errorApi.response.data.context.key !== "email") return

        setError("email", {
            type: "inuse",
            message: errorApi.response.data.message,
        })
    }, [setError, isError])

    return (
        <div className={`page${activeTab === "register" ? "" : " excluded"}`}>
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
                                >
                                    <option className="selectbox-item" value="">
                                        - Bitte wählen -
                                    </option>
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
                        &nbsp;
                    </span>
                    <div className="bookingForm">
                        <div className="bookingFormRow">
                            <span className="bookingFormLabel">
                                Passwort
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
                        <div className="bookingFormRow">
                            <span className="bookingFormLabel">
                                AGB und Datenschutz
                            </span>
                            <div className="bookingFormField">
                                <div
                                    className={`agbCheckbox bookingCheckbox${errors.agb ? " error" : ""}`}
                                >
                                    <input
                                        className="checkbox-cb"
                                        type="checkbox"
                                        {...register("agb", { required: true })}
                                    />
                                    <span className="bookingCheckbox-text">
                                        Den Inhalt der&nbsp;
                                        <a
                                            href=""
                                            onClick={handleAGBClicked}
                                        >
                                            AGB und Datenschutzerklärung
                                        </a>
                                        &nbsp;habe ich zur Kenntnis genommen und erkläre mich damit einverstanden.
                                    </span>
                                </div>
                                {
                                    errors.agb &&
                                    <span className="error-label" role="alert">
                                        {errors.agb.message}
                                    </span>
                                }
                            </div>
                        </div>
                        <span className="captionLabel">
                            Benachrichtigungen
                        </span>
                        <div className="container"></div>
                        <div className="container">
                            <div className="newsletterCheckbox bookingCheckbox">
                                <input
                                    className="checkbox-cb"
                                    type="checkbox"
                                    {...register("reminderemail")}
                                    defaultChecked
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
                                    defaultChecked
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
                                />
                                <span className="bookingCheckbox-text">
                                    Ich möchte Informationen von hairdresser per E-Mail erhalten.
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="clear-row"></div>
                {
                    isSuccess &&
                    <div className="col-1-1">
                        <span className="success-msg" role="alert">
                            {responseApi.message}
                            . Weiter zu&nbsp;
                            <a
                                href=""
                                onClick={handleLoginClicked}
                            >
                                Login
                            </a>
                        </span>
                    </div>
                }
                {
                    isError && isAxiosError(errorApi) && errorApi.response && errorApi.response.data.context === undefined &&
                    <div className="col-1-1">
                        <span className="error-msg" role="alert">
                            {errorApi.response.data.message}
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
                        onClick={() => setActiveTab("login")}
                    >
                        <span>Zurück</span>
                    </button>
                    <AsyncButton
                        className="registerButton bookingFormButton"
                        type="submit"
                        isLoading={isLoading}
                        disabled={isLoading}
                    >
                        Registrieren
                    </AsyncButton>
                </div>
            </form>
        </div>
    )
}

export default Register