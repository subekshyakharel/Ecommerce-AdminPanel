import cloudinary from "../config/cloudinary.js";
import { responseClient } from "../middlewares/responseClient.js";
import {
  createNewProduct,
  deleteProduct,
  getAllProduct,
  getAProduct,
  updateProduct,
} from "../models/product/productModel.js";
import slugify from "slugify";

export const insertNewProduct = async (req, res, next) => {
  try {
    const { fName, _id } = req.adminInfo;
    console.log(fName);

    // Gather all files from req.files object
    const allFiles = [];
    if (req.files) {
      Object.values(req.files).forEach((fileArray) => {
        allFiles.push(...fileArray);
      });
    }

    console.log("Raw size from frontend:", req.body.size);
    //upload image to cloudinary

    // Upload main image
    let imgUrl = "";
    const imageList = [];

    if (req.files?.imgUrl?.length > 0) {
      const upload = await cloudinary.uploader.upload(
        req.files.imgUrl[0].path,
        { folder: "products" }
      );
      imgUrl = upload.secure_url;
      imageList.push(imgUrl); // add to imageList as well
    }

    const obj = {
      ...req.body,
      slug: slugify(
        `${req.body.parentCategory} ${req.body.category} ${req.body.title}`,
        { lower: true }
      ),
      addedby: { name: fName, adminId: _id },
      lastupdatedBy: { name: fName, adminId: _id },
      imgUrl,
      imageList,
    };

    const product = await createNewProduct(obj);
    if (product?._id) {
      return responseClient({
        req,
        res,
        next,
        message: "Product added Successfully!",
      });
    }

    responseClient({
      req,
      res,
      next,
      message: "unable to add the book",
      statusCode: 401,
    });
  } catch (error) {
    console.log(error);
    if (error.message.includes("E11000 duplicate key")) {
      return responseClient({
        req,
        res,
        message:
          "Duplicate data not allowed: " + JSON.stringify(error.keyValue),
        statusCode: 400,
      });
    }
    next(error);
  }
};

export const getAllProductController = async (req, res, next) => {
  try {
    const products = await getAllProduct();

    // if (products.length > 0) {
    //   return responseClient({
    //     req,
    //     res,
    //     message: "Here are the Products",
    //     payload: products,
    //   }); // add return to stop execution
    // }

    // // If no products found
    // return responseClient({
    //   req,
    //   res,
    //   statusCode: 404, // 404 is better for "not found"
    //   message: "No products found",
    //   payload: products,
    // });

    return responseClient({
      req,
      res,
      message:
        products.length > 0 ? "Here are the Products" : "No products found",
      payload: products,
    });
  } catch (error) {
    next(error);
  }
};

export const getSingleProductController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await getAProduct({ _id: id });

    if (product?._id) {
      return responseClient({
        req,
        res,
        next,
        message: "Here is the product",
        payload: product,
      });
    }

    responseClient({
      req,
      res,
      statusCode: 401,
      message: "Unable to get product",
    });
  } catch (error) {
    next(error);
  }
};

export const deleteProductController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedItem = await deleteProduct(id);

    deletedItem
      ? responseClient({
          req,
          res,
          message: "The product is deleted",
          payload: deletedItem,
        })
      : responseClient({
          req,
          res,
          message: "Cannot be deleted",
          statusCode: 404,
        });
  } catch (error) {
    next(error);
  }
};

export const updateProductController = async (req, res, next) => {
  try {
    const { id } = req.params;

    const dataToUpdate = { ...req.body };

    if (req.files?.imgUrl?.length > 0) {
      const upload = await cloudinary.uploader.upload(
        req.files.imgUrl[0].path,
        { folder: "products" }
      );

      dataToUpdate.imgUrl = upload.secure_url;
    }

    // // ---------- HANDLE IMAGE LIST UPLOAD ----------
    // if (req.files?.imageList?.length > 0) {
    //   const imageList = [];

    //   for (let file of req.files.imageList) {
    //     const upload = await cloudinary.uploader.upload(file.path, {
    //       folder: "products",
    //     });
    //     imageList.push(upload.secure_url);
    //   }

    //   dataToUpdate.imageList = imageList;
    // }

    const updated = await updateProduct(id, dataToUpdate);

    updated._id
      ? responseClient({
          req,
          res,
          message: "The product has been updated successfully!",
          payload: updated,
        })
      : responseClient({
          req,
          res,
          message:
            "Unable to update the product in the database, try again later.",
          statusCode: 400,
        });
  } catch (error) {
    next(error);
  }
};
