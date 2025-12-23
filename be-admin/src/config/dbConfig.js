import mongoose from "mongoose";

export const dbConnect = () => {
  if (!process.env.MONGO_URL) {
    throw new Error("Provide MONGO_URL connection String");
  }
  return mongoose.connect(process.env.MONGO_URL);
};
