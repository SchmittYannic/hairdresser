import { useMutation } from "react-query"
import { isAxiosError } from "axios"
import api from "../api"
import useSessionContext from "./useSessionContext"

const useDeleteAppointment = () => {
    const { setCookieInfo, refetchNextAppointment } = useSessionContext()

    const deleteAppointment = async (appointmentId: string) => {
        const response = await api.delete(`/appointment/resource/${appointmentId}`, { withCredentials: true })
        return response.data
    }

    return useMutation({
        mutationFn: deleteAppointment,
        onSuccess: ({ cookieInfo }) => {
            setCookieInfo(cookieInfo);
            refetchNextAppointment();
        },
        onError: (error) => {
            if (isAxiosError(error) && error.response) {
                console.error(error.response.data.message)
            } else {
                console.error("An error occured in useLogin")
            }
        },
    })
}

export default useDeleteAppointment