import { useMutation } from "react-query"
import { isAxiosError } from "axios"
import api from "../api"
import useSessionContext from "./useSessionContext"
import { AppointmentDataType } from "../utils/types"


const useCreateAppointment = () => {
    const { setCookieInfo } = useSessionContext()

    const createAppointment = async (appointmentData: AppointmentDataType) => {
        const response = await api.post("/appointment", appointmentData, { withCredentials: true })
        return response.data
    }

    return useMutation({
        mutationFn: createAppointment,
        onSuccess: ({ cookieInfo }) => {
            setCookieInfo(cookieInfo);
        },
        onError: (error) => {
            if (isAxiosError(error) && error.response) {
                console.error(error.response.data.message)
            } else {
                console.error("An error occured in useCreateNewUser")
            }
        }
    })
}

export default useCreateAppointment