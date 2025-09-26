import mongoose from "mongoose";
const { Schema } = mongoose;

const supportSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: [3, "Name must be at least 3 characters"],
      maxlength: [20, "Name cannot exceed 20 characters"],
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"],
    },
    subject: {
      type: String,
      trim: true,
      required: true,
      minlength: [3, "Subject must be at least 3 characters"],
      maxlength: [30, "Subject cannot exceed 30 characters"],
    },
    message: {
      type: String,
      required: true,
      minlength: [10, "Message must be at least 10 characters"],
      maxlength: [1000, "Message cannot exceed 1000 characters"],
    },
  },
  { timestamps: true }
);

const Support = mongoose.model("Support", supportSchema);

export default Support;
