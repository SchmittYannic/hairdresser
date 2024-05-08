import { isAxiosError } from "axios"
import { useMutation } from "react-query"
import api from "../api"
import { LoginDataType } from "../utils/types"

const useLogin = () => {
    const login = async (userData: LoginDataType) => {
        const response = await api.post("/auth/login", userData)
        return response.data
    }

    return useMutation({
        mutationFn: login,
        onError: (error) => {
            if (isAxiosError(error) && error.response) {
                console.error(error.response.data.message)
            } else {
                console.error(error)
            }
        }
    })
}

export default useLogin