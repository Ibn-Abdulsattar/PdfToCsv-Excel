import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
  {
    user: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "User", 
      required: [true, "User is required"], 
    },
    provider: { 
      type: String, 
      enum: ["stripe", "paypal"], 
      required: [true, "Payment provider is required"], 
      trim: true, 
      lowercase: true 
    },
    amount: { 
      type: Number, 
      required: [true, "Amount is required"], 
      min: [0.01, "Amount must be greater than 0"] 
    },
    currency: { 
      type: String, 
      default: "USD", 
      uppercase: true, 
      minlength: 3, 
      maxlength: 3 
    },
    status: { 
      type: String, 
      enum: ["pending", "completed", "failed"], 
      default: "pending" 
    },
    transactionId: { 
      type: String, 
      trim: true, 
      unique: true, 
      sparse: true // allows multiple nulls but unique when present
    },
  },
  { 
    timestamps: true, 
    strict: true,      // only allow defined fields
    versionKey: false  // removes __v field
  }
);

// Add an index for faster lookups
paymentSchema.index({ user: 1, provider: 1, transactionId: 1 });

export default mongoose.model("Payment", paymentSchema);
