import {
    createContext,
    PropsWithChildren,
    ReactElement,
    useEffect,
    useRef,
    useState,
} from "react";

type StateType = {
    userId: string,
    email: string,
    lastname: string,
    firstname: string,
    cookie_expires: string,
    cookie_originalMaxAge: string,
}

type SessionContextType = {
    userInfo: StateType,
    setUserInfo: React.Dispatch<React.SetStateAction<StateType>>,
    resetUserInfo: Function,
}

const defaultState: StateType = {
    userId: "",
    email: "",
    lastname: "",
    firstname: "",
    cookie_expires: "",
    cookie_originalMaxAge: "",
}

const initContextState = {
    userInfo: defaultState,
    setUserInfo: () => { },
    resetUserInfo: () => { },
};

export const SessionContext = createContext<SessionContextType>(initContextState);

export const SessionProvider = ({ children }: PropsWithChildren): ReactElement => {

    const [userInfo, setUserInfo] = useState<StateType>(defaultState);
    const timeout: React.MutableRefObject<ReturnType<typeof setTimeout> | undefined> = useRef<ReturnType<typeof setTimeout>>();

    const resetUserInfo = () => {
        setUserInfo(defaultState);
    }

    useEffect(() => {
        if (timeout.current) clearTimeout(timeout.current);
        if (userInfo.userId === "") return

        const now = new Date();
        const expirationDate = new Date(userInfo.cookie_expires);
        const timediff = expirationDate.getTime() - now.getTime();

        timeout.current = setTimeout(() => {
            resetUserInfo();
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
                resetUserInfo,
            }}
        >
            {children}
        </SessionContext.Provider>
    )
}