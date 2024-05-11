import { PropsWithChildren, ReactElement, createContext, useState } from "react"

type ServiceInfoType = {
    service_name: string,
    employee_name: string,
}

const defaultServiceInfo: ServiceInfoType = {
    service_name: "",
    employee_name: "",
}

type ServiceContextType = {
    serviceInfo: ServiceInfoType,
    setServiceInfo: React.Dispatch<React.SetStateAction<ServiceInfoType>>,
    resetServiceInfo: () => void,
}

const initContextState = {
    serviceInfo: defaultServiceInfo,
    setServiceInfo: () => { },
    resetServiceInfo: () => { },
}

export const ServiceContext = createContext<ServiceContextType>(initContextState);

export const ServiceProvider = ({ children }: PropsWithChildren): ReactElement => {
    const [serviceInfo, setServiceInfo] = useState<ServiceInfoType>(defaultServiceInfo);

    const resetServiceInfo = () => {
        setServiceInfo(defaultServiceInfo);
    }

    return (
        <ServiceContext.Provider
            value={{
                serviceInfo,
                setServiceInfo,
                resetServiceInfo,
            }}
        >
            {children}
        </ServiceContext.Provider>
    )
}