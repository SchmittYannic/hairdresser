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
            expires: process.env.EXPIRATION_RESET_TOKEN + "s"
        },
    }
);

resetPasswordTokenSchema.index({ createdAt: 1 }, { expireAfterSeconds: parseInt(process.env.EXPIRATION_RESET_TOKEN) });

export default mongoose.model("Resetpasswordtoken", resetPasswordTokenSchema);