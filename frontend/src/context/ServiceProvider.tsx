import { PropsWithChildren, ReactElement, createContext, useState } from "react"

type ServiceInfoType = {
    service_name: string,
    service_duration: number,
    employee_name: string,
}

const defaultServiceInfo: ServiceInfoType = {
    service_name: "",
    service_duration: 0,
    employee_name: "",
}

type ServiceContextType = {
    serviceInfo: ServiceInfoType,
    setServiceInfo: React.Dispatch<React.SetStateAction<ServiceInfoType>>,
    appointment: Date | undefined,
    setAppointment: React.Dispatch<React.SetStateAction<Date | undefined>>,
    resetServiceInfo: () => void,
}

const initContextState = {
    serviceInfo: defaultServiceInfo,
    setServiceInfo: () => { },
    appointment: undefined,
    setAppointment: () => { },
    resetServiceInfo: () => { },
}

export const ServiceContext = createContext<ServiceContextType>(initContextState);

export const ServiceProvider = ({ children }: PropsWithChildren): ReactElement => {
    const [serviceInfo, setServiceInfo] = useState<ServiceInfoType>(defaultServiceInfo);
    const [appointment, setAppointment] = useState<Date | undefined>(undefined);

    const resetServiceInfo = () => {
        setServiceInfo(defaultServiceInfo);
    }

    return (
        <ServiceContext.Provider
            value={{
                serviceInfo,
                setServiceInfo,
                appointment,
                setAppointment,
                resetServiceInfo,
            }}
        >
            {children}
        </ServiceContext.Provider>
    )
}