import { Schema, model } from "mongoose";

const categorySchema = new Schema(
    {
        title: {
            type: String,
            required: [true, "Title is required"],
            minlength: [3, "Title must at least 3 characters long"],
        },
        path: {
            type: String,
            unique: true,
            required: [true, "Url Path is required"],
            minlength: [3, "Url Path must at least 3 characters long"],
        },
        owner: {
            type: Schema.Types.ObjectId,
            required: [true, "Owner is required"],
            ref: "User",
        },
    },
    { timestamps: true }
);

export default model("Category", categorySchema);
