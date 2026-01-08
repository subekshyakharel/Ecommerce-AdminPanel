import express from "express";
import {
  deleteSubCatController,
  fetchAllCategories,
  fetchParentCategoryController,
  insertNewCategory,
} from "../controller/categoryController.js";
import { adminAuthMiddleware } from "../middlewares/authMiddlewares.js";
import { upload } from "../utils/multer.js";
// import { newCategoryDataValidation } from "../middlewares/validations/categoryDataValidation.js";
const router = express.Router();

router.post(
  "/",
  adminAuthMiddleware,
  upload.single("image"),
  // newCategoryDataValidation,
  insertNewCategory
);

router.get("/allCategory", fetchAllCategories);

router.get("/parent", fetchParentCategoryController);

router.delete("/deleteSubCat/:id", adminAuthMiddleware, deleteSubCatController);
export default router;
