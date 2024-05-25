import { isAxiosError } from "axios"
import { useQuery } from "react-query"
import api from "../api"
import useSessionContext from "./useSessionContext"

const useGetNextAppointment = () => {
    const { setCookieInfo } = useSessionContext();

    const getNextAppointment = async () => {
        const response = await api.get("/appointment", { withCredentials: true })
        return response.data
    }

    return useQuery({
        queryKey: ["nextAppointment"],
        queryFn: getNextAppointment,
        enabled: false,
        onSuccess: ({ cookieInfo }) => {
            setCookieInfo(cookieInfo);
        },
        onError: (error) => {
            if (isAxiosError(error) && error.response) {
                console.error(error.response.data.message)
            } else {
                console.error("An error occured in useGetNextAppointment")
            }
        },
    })
}

export default useGetNextAppointment