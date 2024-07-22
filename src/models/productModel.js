import { Schema, model } from "mongoose";

const IMAGE_PATTERN = /^https?:\/\/.*\/.*\.(png|jpeg|jpg)$/i;

const productSchema = new Schema(
    {
        title: {
            type: String,
            required: [true, "Title is required"],
            minlength: [3, "Title must at least 3 characters long"],
        },
        vendor: {
            type: String,
            required: [true, "Vendor is required"],
            minlength: [3, "Title must at least 3 characters long"],
        },
        category: {
            type: Schema.Types.ObjectId,
            required: [true, "Category is required"],
            ref: "Category",
        },
        availability: {
            type: Number,
            min: [1, "Availability must be minimum 1"],
        },
        price: {
            type: Number,
            min: [0.01, "Price must be a positive number"],
        },
        discount: {
            type: Number,
            min: [0.01, "Discount must be between 0.01 and 0.99"],
            max: [0.99, "Discount must be between 0.01 and 0.99"],
        },
        imgUrl: {
            type: String,
            validate: {
                validator: (value) => IMAGE_PATTERN.test(value),
                message: (props) => {
                    return `${props.value} is not a valid image URL`;
                },
            },
        },
        description: {
            type: String,
            minlength: [10, "Description must at least 10 characters long"],
            maxlength: [1000, "Description accepts a maximum of 1000 characters"],
        },
        owner: {
            type: Schema.Types.ObjectId,
            required: [true, "Owner is required"],
            ref: "User",
        },
        bought: [
            {
                type: Schema.Types.ObjectId,
                ref: "User",
            },
        ],
    },
    { timestamps: true }
);

export default model("Product", productSchema);
