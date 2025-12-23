import express from "express";
import {
  deleteProductController,
  getAllProductController,
  getSingleProductController,
  insertNewProduct,
  updateProductController,
} from "../controller/productController.js";
import { adminAuthMiddleware } from "../middlewares/authMiddlewares.js";
import { upload } from "../utils/multer.js";
import {
  newProductDataValidation,
  updateProductDataValidation,
} from "../middlewares/validations/productDataValidation.js";
import { parseArrayFields } from "../middlewares/validations/parseArrayFields.js";
const router = express.Router();

router.post(
  "/product",
  adminAuthMiddleware,
  upload.fields([
    { name: "imgUrl", maxCount: 1 },
    { name: "imageList", maxCount: 5 },
  ]),
  parseArrayFields,
  newProductDataValidation,
  insertNewProduct
);

router.get("/getAllProduct", getAllProductController);
router.get("/public/:id", getSingleProductController);
router.delete("/:id", adminAuthMiddleware, deleteProductController);
router.put(
  "/update/:id",
  adminAuthMiddleware,
  upload.fields([
    { name: "imgUrl", maxCount: 1 },
    { name: "imageList", maxCount: 5 },
  ]),
  parseArrayFields,
  updateProductDataValidation,
  updateProductController
);

export default router;
