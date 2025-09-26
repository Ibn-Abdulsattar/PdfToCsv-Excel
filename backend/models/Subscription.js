import mongoose from "mongoose";
const { Schema } = mongoose;

const subscriptionSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    plan: {
      type: String,
      enum: ["free", "monthly", "yearly"],
      default: "free",
    },
    startDate: { type: Date, default: Date.now },
    endDate: { type: Date },
    pagesUsed: { type: Number, default: 0 },
    pageLimit: { type: Number, default: 0 },
    status: {
      type: String,
      enum: ["active", "expired", "canceled"],
      default: "active",
    },
  },
  { timestamps: true }
);

const Subscription = mongoose.model("Subscription", subscriptionSchema);
export default Subscription;
