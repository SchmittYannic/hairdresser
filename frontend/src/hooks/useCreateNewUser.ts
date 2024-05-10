import { useMutation } from "react-query"
import { isAxiosError } from "axios"
import api from "../api/"
import useSessionContext from "./useSessionContext"
import { UserDataType } from "../utils/types"

const useCreateNewUser = () => {
    const { setUserInfo, setCookieInfo } = useSessionContext();

    const createNewUser = async (userData: Omit<UserDataType, "passwordrepeat" | "agb" | "birthday"> & { birthday: Date }) => {
        const response = await api.post("/users", userData, { withCredentials: true })
        return response.data
    }

    return useMutation({
        mutationFn: createNewUser,
        onSuccess: ({ userInfo, cookieInfo }) => {
            setUserInfo(userInfo);
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

export default useCreateNewUser