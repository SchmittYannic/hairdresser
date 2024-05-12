import { useQuery } from "react-query"
import { isAxiosError } from "axios"
import api from "../api"
import useSessionContext from "./useSessionContext"
import useServiceContext from "./useServiceContext"

const useGetAllAppointments = () => {
    const { setCookieInfo, setActiveTab } = useSessionContext();
    const { serviceInfo } = useServiceContext();

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
        onError: (error) => {
            if (isAxiosError(error) && error.response) {
                console.error(error.response.data.message)
            } else {
                console.error("An error occured in useCreateNewUser")
            }
        },
        select: ({ appointments, cookieInfo }) => {
            if (serviceInfo.employee_id === "") {
                return { appointments, cookieInfo }
            } else {
                const filteredByEmployee = appointments.filter((obj: any) => obj.employee === serviceInfo.employee_id);
                return { appointments: filteredByEmployee, cookieInfo }
            }
        },
        onSuccess: ({ cookieInfo }) => {
            setCookieInfo(cookieInfo);
            setActiveTab("bookdate");
        },
    })
}

export default useGetAllAppointments