import cloudinary from "../config/cloudinary.js";
import { responseClient } from "../middlewares/responseClient.js";
import {
  createNewCategory,
  getAllCategory,
  getParentCategory,
} from "../models/category/categoryModel.js";
import slugify from "slugify";

export const insertNewCategory = async (req, res, next) => {
  try {
    console.log(req.body);

    // Upload image
    if (!req.file) {
      return responseClient({
        req,
        res,
        statusCode: 400,
        message: "Category image is required",
      });
    }

    const upload = await cloudinary.uploader.upload(req.file.path, {
      folder: "categories",
    });
    const image = upload.secure_url;

    const { parentCategory, subCategory } = req.body;

    // Generate slugs
    const parentSlug = slugify(parentCategory, { lower: true });
    const slug = subCategory ? slugify(subCategory, { lower: true }) : null;

    const categoryObj = {
      parentCategory,
      subCategory: subCategory || null,
      slug,
      parentSlug,
      image,
    };

    const category = await createNewCategory(categoryObj);

    if (category?._id) {
      return responseClient({
        req,
        res,
        message: "Category added successfully",
        payload: category,
      });
    } else {
      return responseClient({
        req,
        res,
        statusCode: 500,
        message: "Failed to add category",
      });
    }
  } catch (error) {
    if (error.code === 11000) {
      // Handle duplicate slug or parent+sub combination
      return responseClient({
        req,
        res,
        statusCode: 400,
        message: "Category already exists",
      });
    }
    next(error);
  }
};

export const fetchAllCategories = async (req, res, next) => {
  try {
    const categories = await getAllCategory();

    if (!categories || categories.length === 0) {
      return responseClient({
        req,
        res,
        statusCode: 404,
        message: "No category found",
      });
    }

    responseClient({
      req,
      res,
      message: "Here are the categories",
      payload: categories,
    });
  } catch (error) {
    next(error);
  }
};

export const fetchParentCategoryController = async (req, res, next) => {
  try {
    const categories = await getParentCategory();

    if (!categories || categories.length == 0) {
      return responseClient({
        req,
        res,
        statusCode: 404,
        message: "No category found",
      });
    }
    responseClient({
      req,
      res,
      message: "Here are the categories",
      payload: categories,
    });
  } catch (error) {
    next(error);
  }
};
