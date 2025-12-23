import { LONG_STR_REQ, SHORT_STR_REQ } from "./joiConst.js";
import { validateData } from "./joiValidation.js";

export const newCategoryDataValidation = (req, res, next) => {
  const obj = {
    parentCategory: SHORT_STR,
    subCategory: SHORT_STR,
  };
  validateData({ req, res, next, obj });

  if (!req.file) {
    return res.status(400).json({ message: "Image is required" });
  }
};
