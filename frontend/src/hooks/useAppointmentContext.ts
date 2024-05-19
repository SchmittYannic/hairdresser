import { useContext } from "react"
import { AppointmentContext } from "../context/AppointmentProvider"

const useAppointmentContext = () => {
    return useContext(AppointmentContext)
}

export default useAppointmentContext