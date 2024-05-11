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
    reminderemail: boolean,
    birthdayemail: boolean,
    newsletter: boolean,
}

type activeTabType = "login" | "register" | "reset" | "agb" | "dashboard" | "editUser" | "services" | "bookdate";

type CookieInfoType = {
    cookie_expires: string,
    cookie_originalMaxAge: string,
}

type SessionContextType = {
    userInfo: UserInfoType,
    setUserInfo: React.Dispatch<React.SetStateAction<UserInfoType>>,
    cookieInfo: CookieInfoType,
    setCookieInfo: React.Dispatch<React.SetStateAction<CookieInfoType>>,
    activeTab: activeTabType,
    setActiveTab: React.Dispatch<React.SetStateAction<activeTabType>>,
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
    reminderemail: false,
    birthdayemail: false,
    newsletter: false,
}

const defaultCookieInfo: CookieInfoType = {
    cookie_expires: "",
    cookie_originalMaxAge: "",
}

const defaultActiveTab: activeTabType = "login";

const initContextState = {
    userInfo: defaultUserInfo,
    setUserInfo: () => { },
    cookieInfo: defaultCookieInfo,
    setCookieInfo: () => { },
    activeTab: defaultActiveTab,
    setActiveTab: () => { },
    resetState: () => { },
};

export const SessionContext = createContext<SessionContextType>(initContextState);

export const SessionProvider = ({ children }: PropsWithChildren): ReactElement => {

    const [userInfo, setUserInfo] = useState<UserInfoType>(defaultUserInfo);
    const [cookieInfo, setCookieInfo] = useState<CookieInfoType>(defaultCookieInfo);
    const [activeTab, setActiveTab] = useState<activeTabType>(defaultActiveTab)
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

    useEffect(() => {
        if (userInfo.userId === "") {
            setActiveTab("login")
        }
    }, [userInfo])

    return (
        <SessionContext.Provider
            value={{
                userInfo,
                setUserInfo,
                cookieInfo,
                setCookieInfo,
                activeTab,
                setActiveTab,
                resetState,
            }}
        >
            {children}
        </SessionContext.Provider>
    )
}