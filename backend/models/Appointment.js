import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema(
    {
        employee: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "User",
        },
        customer: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "User",
        },
        service_name: {
            type: String,
            required: true,
        },
        duration: {
            type: Number,
            required: true,
        },
        start: {
            type: Date,
            required: true,
        },
        end: {
            type: Date,
            required: true,
            validate: {
                validator: function (end) {
                    // Calculate the difference in minutes between 'start' and 'end'
                    const diffMinutes = Math.abs((end - this.start) / (1000 * 60));
                    // Check if the difference is equal to the specified 'duration'
                    return diffMinutes === this.duration;
                },
                message: () => `End time is not equal to the specified duration after the start time`
            }
        },
        remarks: {
            type: String,
            default: "",
        }
    },
    {
        timestamps: true,
    }
);

export default mongoose.model("Appointment", appointmentSchema);