import { useMutation } from "react-query"
import api from "../api"
import { ResetPasswordType } from "../utils/types"

const useUpdatePassword = (resetPasswordToken: string) => {
    const updatePassword = async (data: Omit<ResetPasswordType, "passwordrepeat">) => {
        const response = await api.patch(`/auth/reset/${resetPasswordToken}`, data, { withCredentials: true })
        return response.data
    }

    return useMutation({
        mutationFn: updatePassword,
    })
}

export default useUpdatePassword