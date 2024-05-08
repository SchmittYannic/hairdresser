import { useMutation } from "react-query"
import { isAxiosError } from "axios"
import api from "../api/"
import { UserDataType } from "../utils/types"

const useCreateNewUser = () => {

    const createNewUser = async (userData: Omit<UserDataType, "passwordrepeat" | "agb">) => {
        const response = await api.post("/users", userData)
        return response.data
    }

    return useMutation({
        mutationFn: createNewUser,
        onError: (error) => {
            if (isAxiosError(error) && error.response) {
                console.error(error.response.data.message)
            } else {
                console.error(error)
            }
        }
    })
}

export default useCreateNewUser