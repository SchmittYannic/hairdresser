import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        roles: {
            type: [String],
            default: ["User"],
        },
        title: {
            type: String,
            required: true,
        },
        lastname: {
            type: String,
            required: true,
        },
        firstname: {
            type: String,
            required: true,
        },
        birthday: {
            type: Date,
            required: true,
        },
        phonenumber: {
            type: String,
            required: true,
        },
        validated: {
            type: Boolean,
            default: false,
        },
        reminderemail: {
            type: Boolean,
            default: false,
        },
        birthdayemail: {
            type: Boolean,
            default: false,
        },
        newsletter: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.model("User", userSchema);