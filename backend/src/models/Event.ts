import mongoose from "mongoose";

const EventSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            minlength: 2,
            maxlength: 50,
        },

        description: {
            type: String,
            required: true,
            maxlength: 1000,
        },

        date: {
            type: Date,
            required: true,
        },

        location: {
            type: String,
            required: true,
        },

        latitude: {
            type: Number,
            required: true,
        },

        longitude: {
            type: Number,
            required: true,
        },
    },
    {
        timestamps: true,
        toJSON: {
            virtuals: true,
        },
    }
);

EventSchema.virtual("id").get(function () {
    return this._id.toString();
});

export default mongoose.model("Event", EventSchema);