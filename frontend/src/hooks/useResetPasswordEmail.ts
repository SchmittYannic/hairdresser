import { useMutation } from "react-query"
import { isAxiosError } from "axios"
import api from "../api"

const useResetPasswordEmail = () => {
    const triggerResetPasswordEmail = async (data: { email: string }) => {
        const response = await api.post("/auth/reset", data, { withCredentials: true })
        return response.data
    }

    return useMutation({
        mutationFn: triggerResetPasswordEmail,
        onError: (error) => {
            if (isAxiosError(error) && error.response) {
                console.error(error.response.data.message)
            } else {
                console.error("An error occured in useResetPasswordEmail")
            }
        },
    })
}

export default useResetPasswordEmail