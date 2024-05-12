import { useQuery } from "react-query"
import { isAxiosError } from "axios"
import api from "../api"
import useSessionContext from "./useSessionContext"

const useGetAllAppointments = () => {
    const { setCookieInfo, setActiveTab } = useSessionContext();

    const getAppointments = async () => {
        const response = await api.get("/appointment", { withCredentials: true })
        return response.data
    }

    return useQuery({
        queryKey: ["allapointments"],
        queryFn: getAppointments,
        refetchOnWindowFocus: false,
        enabled: false,
        cacheTime: 0,
        onSuccess: ({ cookieInfo }) => {
            setCookieInfo(cookieInfo);
            setActiveTab("bookdate");
        },
        onError: (error) => {
            if (isAxiosError(error) && error.response) {
                console.error(error.response.data.message)
            } else {
                console.error("An error occured in useCreateNewUser")
            }
        },
    })
}

export default useGetAllAppointments