import { useMutation } from "react-query"
import { isAxiosError } from "axios"
import api from "../api"
import useSessionContext from "./useSessionContext"
import { FilterFreeSlotDataType } from "../utils/types"


const useGetFreeSlots = () => {
    const { setCookieInfo, setActiveTab } = useSessionContext();

    const getFreeSlots = async (data: FilterFreeSlotDataType) => {
        const response = await api.post("/appointment/filter", data, { withCredentials: true })
        return response.data
    }

    return useMutation({
        mutationFn: getFreeSlots,
        onError: (error) => {
            if (isAxiosError(error) && error.response) {
                console.error(error.response.data.message)
            } else {
                console.error("An error occured in useGetFreeSlots")
            }
        },
        onSuccess: ({ cookieInfo }) => {
            setCookieInfo(cookieInfo);
            setActiveTab("bookdate");
        },
    })
}

export default useGetFreeSlots