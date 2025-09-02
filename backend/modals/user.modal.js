import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    dob: {
      type: String,
      required: true,
    },
    otp: {
      type: Number,
      default: null,
    },
    otpExpiry: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true}
);

export const User = mongoose.model("User", userSchema);
export default User;
