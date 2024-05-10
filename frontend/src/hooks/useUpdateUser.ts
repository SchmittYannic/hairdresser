import { isAxiosError } from "axios";
import { useMutation } from "react-query";
import api from "../api";
import useSessionContext from "./useSessionContext";
import { EditUserType } from "../utils/types";


const useUpdateUser = () => {
    const { setCookieInfo, setUserInfo } = useSessionContext();

    const updateUser = async (userData: Omit<EditUserType, "passwordrepeat">) => {
        const response = await api.patch("/users", userData, { withCredentials: true })
        return response.data
    }

    return useMutation({
        mutationFn: updateUser,
        onSuccess: ({ userInfo, cookieInfo }) => {
            setUserInfo(userInfo);
            setCookieInfo(cookieInfo);
        },
        onError: (error) => {
            if (isAxiosError(error) && error.response) {
                console.error(error.response.data.message)
            } else {
                console.error("An error occured in useUpdateUser")
            }
        }
    })
}

export default useUpdateUser