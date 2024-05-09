import { isAxiosError } from "axios"
import { useMutation } from "react-query"
import api from "../api"

const useLogout = () => {
    const logout = async () => {
        const response = await api.delete("/auth")
        return response.data
    }

    return useMutation({
        mutationFn: logout,
        onError: (error) => {
            if (isAxiosError(error) && error.response) {
                console.error(error.response.data.message)
            } else {
                console.error("An error occured in useLogout")
            }
        }
    })
}

export default useLogout