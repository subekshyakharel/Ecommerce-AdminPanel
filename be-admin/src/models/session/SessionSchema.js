import mongoose from "mongoose";

const sessionSchema = new mongoose.Schema(
  {
    token: {
      type: String,
      required: true,
    },
    association: {
      type: String,
    },
    // expire: {
    //   type: Date,
    //   required: true,
    //   default: new Date(Date.now() + 5000),
    //   expires: 0,
    // },
    expire: {
      type: Date,
      default: () => new Date(Date.now() + 5000), // function, not direct call
      expires: 0, // expire exactly at the set date
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Session", sessionSchema);
