import { useQuery } from "react-query"
import { isAxiosError } from "axios"
import api from "../api"

const useGetIsResetTokenValid = (resetPasswordToken: string) => {
    const isResetTokenValid = async () => {
        const response = await api.get(`/auth/reset/${resetPasswordToken}`, { withCredentials: true })
        return response.data
    }

    return useQuery({
        queryKey: ["resetPasswordToken"],
        queryFn: isResetTokenValid,
        retry: 1,
        staleTime: 0,
        refetchOnWindowFocus: false,
        onError: (error) => {
            if (isAxiosError(error) && error.response) {
                console.error(error.response.data.message)
            } else {
                console.error("An error occured in useGetIsResetTokenValid")
            }
        }
    })
}

export default useGetIsResetTokenValid