import mongoose from "mongoose";

const adminSchema = new mongoose.Schema(
  {
    fName: {
      type: String,
      required: true,
    },
    lName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      index: 1,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: "admin",
    },
    password: {
      type: String,
      required: true,
    },
    refreshJWT: {
      type: String,
    },
    expire: {
      type: Date,
      default: new Date(Date.now() + 100000000000),
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Admin", adminSchema); //users
