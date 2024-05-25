import { useQuery } from "react-query"
import { isAxiosError } from "axios"
import api from "../api"
import useSessionContext from "./useSessionContext"

const useGetArchivedAppointments = () => {
    const { setCookieInfo } = useSessionContext()

    const getArchivedAppointments = async () => {
        const response = await api.get("/appointment/archive", { withCredentials: true })
        return response.data
    }

    return useQuery({
        queryKey: ["archivedAppointments"],
        queryFn: getArchivedAppointments,
        enabled: false,
        onSuccess: ({ cookieInfo }) => {
            setCookieInfo(cookieInfo);
        },
        onError: (error) => {
            if (isAxiosError(error) && error.response) {
                console.error(error.response.data.message)
            } else {
                console.error("An error occured in useGetArchivedAppointments")
            }
        },
    })
}

export default useGetArchivedAppointments