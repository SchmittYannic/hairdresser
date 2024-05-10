import { isAxiosError } from "axios"
import { useMutation } from "react-query"
import api from "../api"
import useSessionContext from "./useSessionContext"
import { LoginDataType } from "../utils/types"

const useLogin = () => {
    const { setUserInfo, setCookieInfo, setActiveTab } = useSessionContext();

    const login = async (userData: LoginDataType) => {
        const response = await api.post("/auth", userData, { withCredentials: true })
        return response.data
    }

    return useMutation({
        mutationFn: login,
        onSuccess: ({ userInfo, cookieInfo }) => {
            setUserInfo(userInfo);
            setCookieInfo(cookieInfo);
            setActiveTab("dashboard");
        },
        onError: (error) => {
            if (isAxiosError(error) && error.response) {
                console.error(error.response.data.message)
            } else {
                console.error("An error occured in useLogin")
            }
        }
    })
}

export default useLogin