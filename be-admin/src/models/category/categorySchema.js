import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    parentCategory: {
      type: String,
      required: true,
      // unique: true,
      index: 1,
    },
    subCategory: {
      type: String,
      default: null, // null => parent category
      // index: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    parentSlug: {
      type: String,
      default: null,
    },
    image: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
  },
  {
    timestamps: true,
  }
);

// // Composite index: parent + sub must be unique
// categorySchema.index({ parentCategory: 1, subCategory: 1 }, { unique: true });

export default mongoose.model("Category", categorySchema);
