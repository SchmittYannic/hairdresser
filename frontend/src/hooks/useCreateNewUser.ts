import { useMutation } from "react-query"
import { isAxiosError } from "axios"
import api from "../api/"

type UserDataType = {
    email: string
    password: string,
    title: "Herr" | "Frau" | "Divers",
    lastname: string,
    firstname: string,
    birthday: string,
    phonenumber: string,
    reminderemail: boolean,
    birthdayemail: boolean,
    newsletter: boolean,
}

const useCreateNewUser = () => {

    const createNewUser = async (userData: UserDataType) => {
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