import { isAxiosError } from "axios"
import { useMutation } from "react-query"
import api from "../api"
import useSessionContext from "./useSessionContext"

const useLogout = () => {
    const { resetState } = useSessionContext();

    const logout = async () => {
        const response = await api.delete("/auth", { withCredentials: true })
        return response.data
    }

    return useMutation({
        mutationFn: logout,
        onSettled: () => {
            resetState();
        },
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