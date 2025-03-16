import { useMutation } from "react-query"
import { isAxiosError } from "axios"
import api from "../api/"
import { ApplicationDataType } from "src/utils/types"

const useSaveNewApplication = () => {

    const saveNewApplication = async (applicationData: ApplicationDataType) => {
        const response = await api.post("/application", applicationData, { withCredentials: true })
        return response.data
    }

    return useMutation({
        mutationFn: saveNewApplication,
        onError: (error) => {
            if (isAxiosError(error) && error.response) {
                console.error(error.response.data.message)
            } else {
                console.error("An error occured in useSaveNewApplication")
            }
        }
    })
}

export default useSaveNewApplication