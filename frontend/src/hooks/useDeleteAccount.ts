import { useMutation } from "react-query"
import api from "../api"
import useSessionContext from "./useSessionContext"
import { isAxiosError } from "axios"

const useDeleteAccount = () => {
    const { resetState } = useSessionContext()

    const deleteAccount = async (data: { password: string }) => {
        const response = await api.post("/users/delete", data, { withCredentials: true })
        return response.data
    }

    return useMutation({
        mutationFn: deleteAccount,
        onSuccess: () => {
            resetState();
        },
        onError: (error) => {
            if (isAxiosError(error) && error.response) {
                console.error(error.response.data.message)
            } else {
                console.error("An error occured in useDeleteAccount")
            }
        },
    })
}

export default useDeleteAccount