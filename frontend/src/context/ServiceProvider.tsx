import { PropsWithChildren, ReactElement, createContext, useState } from "react"
import useGetFreeSlots from "../hooks/useGetFreeSlots"
import { UseMutateFunction } from "react-query"
import { FilterFreeSlotDataType, FreeTimeslotType } from "../utils/types"
import { proposalDateRangeValues, proposalDateRangeValuesType } from "../constants"

type ServiceInfoType = {
    service_name: string,
    service_duration: number,
    employee_id: string,
    employee_firstname: string,
    employee_lastname: string,
}

const defaultServiceInfo: ServiceInfoType = {
    service_name: "",
    service_duration: 30,
    employee_id: "",
    employee_firstname: "",
    employee_lastname: "",
}

export type FilterTimeType = {
    min: proposalDateRangeValuesType,
    max: proposalDateRangeValuesType,
}

const defaultFilterTime: FilterTimeType = {
    min: proposalDateRangeValues[0],
    max: proposalDateRangeValues[proposalDateRangeValues.length - 1],
}

type ServiceContextType = {
    serviceInfo: ServiceInfoType,
    setServiceInfo: React.Dispatch<React.SetStateAction<ServiceInfoType>>,
    appointment: Date | undefined,
    setAppointment: React.Dispatch<React.SetStateAction<Date | undefined>>,
    filterTime: FilterTimeType,
    setFilterTime: React.Dispatch<React.SetStateAction<FilterTimeType>>,
    resetServiceInfo: () => void,
    triggerGetFreeSlots: UseMutateFunction<any, unknown, FilterFreeSlotDataType, unknown>,
    isGetFreeSlotsError: boolean,
    isGetFreeSlotsLoading: boolean,
    freeTimeslots: FreeTimeslotType[],
}

const initContextState = {
    serviceInfo: defaultServiceInfo,
    setServiceInfo: () => { },
    appointment: undefined,
    setAppointment: () => { },
    filterTime: defaultFilterTime,
    setFilterTime: () => { },
    resetServiceInfo: () => { },
    triggerGetFreeSlots: () => { },
    isGetFreeSlotsError: false,
    isGetFreeSlotsLoading: false,
    freeTimeslots: [],
}

export const ServiceContext = createContext<ServiceContextType>(initContextState);

export const ServiceProvider = ({ children }: PropsWithChildren): ReactElement => {
    const [serviceInfo, setServiceInfo] = useState<ServiceInfoType>(defaultServiceInfo);
    const [appointment, setAppointment] = useState<Date | undefined>(undefined);
    const [filterTime, setFilterTime] = useState<FilterTimeType>(defaultFilterTime);
    const {
        mutate: triggerGetFreeSlots,
        isError: isGetFreeSlotsError,
        isLoading: isGetFreeSlotsLoading,
        isSuccess: isGetFreeSlotsSuccess,
        data,
    } = useGetFreeSlots();

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
                filterTime,
                setFilterTime,
                resetServiceInfo,
                triggerGetFreeSlots,
                isGetFreeSlotsError,
                isGetFreeSlotsLoading,
                freeTimeslots: isGetFreeSlotsSuccess ? data.freeTimeslots : [],
            }}
        >
            {children}
        </ServiceContext.Provider>
    )
}