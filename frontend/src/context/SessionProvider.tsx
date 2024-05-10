import {
    createContext,
    PropsWithChildren,
    ReactElement,
    useEffect,
    useRef,
    useState,
} from "react";

type UserInfoType = {
    userId: string,
    email: string,
    title: string,
    lastname: string,
    firstname: string,
    birthday: string,
    phonenumber: string,
    reminderemail: string,
    birthdayemail: string,
    newsletter: string,
}

type CookieInfoType = {
    cookie_expires: string,
    cookie_originalMaxAge: string,
}

type SessionContextType = {
    userInfo: UserInfoType,
    setUserInfo: React.Dispatch<React.SetStateAction<UserInfoType>>,
    cookieInfo: CookieInfoType,
    setCookieInfo: React.Dispatch<React.SetStateAction<CookieInfoType>>
    resetState: Function,
}

const defaultUserInfo: UserInfoType = {
    userId: "",
    email: "",
    title: "",
    lastname: "",
    firstname: "",
    birthday: "",
    phonenumber: "",
    reminderemail: "",
    birthdayemail: "",
    newsletter: "",
}

const defaultCookieInfo: CookieInfoType = {
    cookie_expires: "",
    cookie_originalMaxAge: "",
}

const initContextState = {
    userInfo: defaultUserInfo,
    setUserInfo: () => { },
    cookieInfo: defaultCookieInfo,
    setCookieInfo: () => { },
    resetState: () => { },
};

export const SessionContext = createContext<SessionContextType>(initContextState);

export const SessionProvider = ({ children }: PropsWithChildren): ReactElement => {

    const [userInfo, setUserInfo] = useState<UserInfoType>(defaultUserInfo);
    const [cookieInfo, setCookieInfo] = useState<CookieInfoType>(defaultCookieInfo);
    const timeout: React.MutableRefObject<ReturnType<typeof setTimeout> | undefined> = useRef<ReturnType<typeof setTimeout>>();

    const resetState = () => {
        setUserInfo(defaultUserInfo);
        setCookieInfo(defaultCookieInfo);
    }

    useEffect(() => {
        if (timeout.current) clearTimeout(timeout.current);
        if (userInfo.userId === "") return
        if (cookieInfo.cookie_expires === "") return

        const now = new Date();
        const expirationDate = new Date(cookieInfo.cookie_expires);
        const timediff = expirationDate.getTime() - now.getTime();

        timeout.current = setTimeout(() => {
            resetState();
        }, timediff);

        return () => {
            if (timeout.current) clearTimeout(timeout.current);
        }
    }, [userInfo]);

    return (
        <SessionContext.Provider
            value={{
                userInfo,
                setUserInfo,
                cookieInfo,
                setCookieInfo,
                resetState,
            }}
        >
            {children}
        </SessionContext.Provider>
    )
}