import mongoose from "mongoose";
const { Schema } = mongoose;

const conversionSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    fileName: { type: String }, // optional: track which file was converted
    pagesConverted: { type: Number, required: true },
    usedUnder: {
      type: String,
      enum: ["free_trial", "subscription"],
      required: true,
    },
    status: { type: String, enum: ["success", "failed"], default: "success" },
  },
  { timestamps: true }
);

const Conversion = mongoose.model("Conversion", conversionSchema);
export default Conversion;
