import mongoose from "mongoose";
const { Schema } = mongoose;

const pricingSchema = new Schema(
  {
    title: {
      type: String,
      trim: true,
      required: [true, "Title is required"],
      minlength: [5, "Title must be at least 5 characters long"],
      maxlength: [20, "Title cannot exceed 20 characters"],
      unique: true, // prevent duplicates
      index: true, // optimize search
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
      min: [1, "Price must be at least 1"],
      max: [100000, "Price cannot exceed 100,000"], // optional safety limit
    },
    category: {
      type: String,
      required: [true, "Category is required"],
      trim: true,
      enum: {
        values: ["monthly", "yearly"], // restrict categories
        message: "Category must be either monthly or yearly",
      },
    },
    pages: {
      type: Number,
      required: [true, "Pages are required"],
      min: [1, "Pages must be at least 1"],
      max: [5000, "Pages cannot exceed 5000"], // safety upper bound
    },
  },
  {
    timestamps: true, // adds createdAt & updatedAt
  }
);

export default mongoose.model("Pricing", pricingSchema);
