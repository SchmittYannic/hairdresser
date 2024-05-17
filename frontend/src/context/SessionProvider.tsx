import {
    createContext,
    PropsWithChildren,
    ReactElement,
    useEffect,
    useRef,
    useState,
} from "react";
import { QueryObserverResult, RefetchOptions, RefetchQueryFilters } from "react-query";
import useLogout from "../hooks/useLogout";
import useGetNextAppointment from "../hooks/useGetNextAppointment";
import useGetArchivedAppointments from "../hooks/useGetArchivedAppointments";
import { AppointmentType } from "../utils/types";

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

type activeTabType = "login" | "register" | "reset" | "agb" | "dashboard" | "editUser" | "pastappointments" | "services" | "bookdate" | "confirmdate";

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
    nextAppointment: AppointmentType[],
    isNextAppointmentError: boolean,
    isNextAppointmentLoading: boolean,
    isNextAppointmentSuccess: boolean,
    refetchNextAppointment: <TPageData>(options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined) => Promise<QueryObserverResult<any, unknown>>,
    archivedAppointments: (Omit<AppointmentType, 'remarks'> & { reservedAt: Date })[],
    isArchivedAppointmentsLoading: boolean,
    isArchivedAppointmentsError: boolean,
    isArchivedAppointmentsSuccess: boolean,
    refetchArchivedAppointments: <TPageData>(options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined) => Promise<QueryObserverResult<any, unknown>>,
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

const defaultRefetch: <TPageData>(options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined) => Promise<QueryObserverResult<any, unknown>> =
    async () => {
        return {
            data: undefined,
            error: null,
            isError: false,
            isFetched: false,
            isFetchedAfterMount: false,
            isFetching: false,
            isLoading: false,
            isRefetching: false,
            isStale: true,
            status: 'idle',
            // Add other properties if necessary based on QueryObserverResult type
        } as QueryObserverResult<any, unknown>;
    };

const initContextState = {
    userInfo: defaultUserInfo,
    setUserInfo: () => { },
    cookieInfo: defaultCookieInfo,
    setCookieInfo: () => { },
    activeTab: defaultActiveTab,
    setActiveTab: () => { },
    resetState: () => { },
    nextAppointment: [],
    isNextAppointmentError: false,
    isNextAppointmentLoading: false,
    isNextAppointmentSuccess: false,
    refetchNextAppointment: defaultRefetch,
    archivedAppointments: [],
    isArchivedAppointmentsLoading: false,
    isArchivedAppointmentsError: false,
    isArchivedAppointmentsSuccess: false,
    refetchArchivedAppointments: defaultRefetch,
};

export const SessionContext = createContext<SessionContextType>(initContextState);

export const SessionProvider = ({ children }: PropsWithChildren): ReactElement => {
    const { mutate: triggerLogout } = useLogout();
    const {
        data: nextAppointmentData,
        isError: isNextAppointmentError,
        isLoading: isNextAppointmentLoading,
        isSuccess: isNextAppointmentSuccess,
        refetch: refetchNextAppointment,
    } = useGetNextAppointment();
    const {
        data: archivedAppointmentsData,
        isError: isArchivedAppointmentsError,
        isLoading: isArchivedAppointmentsLoading,
        isSuccess: isArchivedAppointmentsSuccess,
        refetch: refetchArchivedAppointments,
    } = useGetArchivedAppointments();
    const [userInfo, setUserInfo] = useState<UserInfoType>(defaultUserInfo);
    const [cookieInfo, setCookieInfo] = useState<CookieInfoType>(defaultCookieInfo);
    const [activeTab, setActiveTab] = useState<activeTabType>(defaultActiveTab);
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
            triggerLogout();
            resetState();
        }, timediff);

        return () => {
            if (timeout.current) clearTimeout(timeout.current);
        }
    }, [userInfo]);

    useEffect(() => {
        if (userInfo.userId === "") {
            setActiveTab("login")
        } else {
            if (activeTab === "login" || activeTab === "register" || activeTab === "reset" || activeTab === "agb") {
                setActiveTab("dashboard")
            }
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
                nextAppointment: isNextAppointmentError || !nextAppointmentData ? [] : nextAppointmentData.nextAppointment,
                isNextAppointmentError,
                isNextAppointmentLoading,
                isNextAppointmentSuccess,
                refetchNextAppointment,
                archivedAppointments: isArchivedAppointmentsError || !archivedAppointmentsData ? [] : archivedAppointmentsData.archivedAppointments,
                isArchivedAppointmentsLoading,
                isArchivedAppointmentsError,
                isArchivedAppointmentsSuccess,
                refetchArchivedAppointments,
            }}
        >
            {children}
        </SessionContext.Provider>
    )
}