import { PropsWithChildren, ReactElement, createContext, useState } from "react"
import { UseMutateFunction } from "react-query"

import useGetFreeSlots from "src/hooks/useGetFreeSlots"
import { FilterFreeSlotDataType, FreeTimeslotType, FilterTimeType, ServiceInfoType } from "src/utils/types"
import { proposalDateRangeValues } from "src/constants"

const defaultServiceInfo: ServiceInfoType = {
    service_name: "",
    service_duration: 30,
    employee_id: "",
    employee_firstname: "",
    employee_lastname: "",
}

const defaultFilterTime: FilterTimeType = {
    min: proposalDateRangeValues[0],
    max: proposalDateRangeValues[proposalDateRangeValues.length - 1],
}

type ServiceContextType = {
    serviceInfo: ServiceInfoType,
    setServiceInfo: React.Dispatch<React.SetStateAction<ServiceInfoType>>,
    calendarDay: Date | undefined,
    setCalendarDay: React.Dispatch<React.SetStateAction<Date | undefined>>,
    filterTime: FilterTimeType,
    setFilterTime: React.Dispatch<React.SetStateAction<FilterTimeType>>,
    resetServiceInfo: () => void,
    resetServiceContext: () => void,
    triggerGetFreeSlots: UseMutateFunction<any, unknown, FilterFreeSlotDataType, unknown>,
    isGetFreeSlotsError: boolean,
    isGetFreeSlotsLoading: boolean,
    freeTimeslots: FreeTimeslotType[],
}

const initContextState = {
    serviceInfo: defaultServiceInfo,
    setServiceInfo: () => { },
    calendarDay: undefined,
    setCalendarDay: () => { },
    filterTime: defaultFilterTime,
    setFilterTime: () => { },
    resetServiceInfo: () => { },
    resetServiceContext: () => { },
    triggerGetFreeSlots: () => { },
    isGetFreeSlotsError: false,
    isGetFreeSlotsLoading: false,
    freeTimeslots: [],
}

export const ServiceContext = createContext<ServiceContextType>(initContextState);

export const ServiceProvider = ({ children }: PropsWithChildren): ReactElement => {
    const [serviceInfo, setServiceInfo] = useState<ServiceInfoType>(defaultServiceInfo);
    const [calendarDay, setCalendarDay] = useState<Date | undefined>(undefined);
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

    const resetServiceContext = () => {
        resetServiceInfo();
        setCalendarDay(undefined);
        setFilterTime(defaultFilterTime)
    }

    return (
        <ServiceContext.Provider
            value={{
                serviceInfo,
                setServiceInfo,
                calendarDay,
                setCalendarDay,
                filterTime,
                setFilterTime,
                resetServiceInfo,
                resetServiceContext,
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