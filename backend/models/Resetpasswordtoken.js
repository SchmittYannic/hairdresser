import mongoose from "mongoose";

const resetPasswordTokenSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "User",
        },
        resetPasswordToken: {
            type: String,
            default: ""
        },
        createdAt: {
            type: Date,
            default: Date.now,
            expires: parseInt(process.env.EXPIRATION_RESET_TOKEN), //in seconds
        },
    }
);

export default mongoose.model("Resetpasswordtoken", resetPasswordTokenSchema);