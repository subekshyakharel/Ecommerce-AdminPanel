import mongoose from "mongoose";

const productSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    imgUrl: {
      type: String,
      required: true,
    },
    imageList: {
      type: [String],
      default: [],
    },
    slug: {
      type: String,
      unique: true,
      index: 1,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    stock: {
      type: Number,
      default: 0,
    },
    averageRating: {
      type: Number,
      min: 0,
      max: 5,
    },
    parentCategory: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    addedby: {
      name: {
        type: String,
      },
      adminId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
      },
    },
    lastupdatedBy: {
      name: {
        type: String,
      },
      adminId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Admin",
        required: true,
      },
    },
    size: {
      type: [String],
    },
    brand: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Product", productSchema);
