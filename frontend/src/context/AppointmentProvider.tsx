import { PropsWithChildren, ReactElement, createContext, useEffect, useState } from "react";
import useServiceContext from "../hooks/useServiceContext";

type AppointmentContextType = {
    appointment: Date | undefined,
    setAppointment: React.Dispatch<React.SetStateAction<Date | undefined>>,
    selectedEmployee: string,
    setSelectedEmployee: React.Dispatch<React.SetStateAction<string>>,
    remarks: string,
    setRemarks: React.Dispatch<React.SetStateAction<string>>,
    resetAppointmentContext: () => void,
}

const initContextState = {
    appointment: undefined,
    setAppointment: () => { },
    selectedEmployee: "",
    setSelectedEmployee: () => { },
    remarks: "",
    setRemarks: () => { },
    resetAppointmentContext: () => { },
}

export const AppointmentContext = createContext<AppointmentContextType>(initContextState);

export const AppointmentProvider = ({ children }: PropsWithChildren): ReactElement => {
    const { calendarDay } = useServiceContext()
    const [appointment, setAppointment] = useState<Date | undefined>(undefined);
    const [selectedEmployee, setSelectedEmployee] = useState<string>("");
    const [remarks, setRemarks] = useState<string>("");

    const resetAppointmentContext = () => {
        setAppointment(undefined);
        setSelectedEmployee("");
        setRemarks("");
    }

    useEffect(() => {
        setAppointment(undefined); // reset appointment on new day selected
        setSelectedEmployee(""); // reset selectedEmployee on new day selected
    }, [calendarDay])

    return (
        <AppointmentContext.Provider
            value={{
                appointment,
                setAppointment,
                selectedEmployee,
                setSelectedEmployee,
                remarks,
                setRemarks,
                resetAppointmentContext,
            }}
        >
            {children}
        </AppointmentContext.Provider>
    )
}