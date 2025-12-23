import {
  LONG_STR_REQ,
  NUMBER_REQ,
  SHORT_STR_REQ,
  STR_ARRAY_REQ,
} from "./joiConst.js";
import { validateData } from "./joiValidation.js";
import Joi from "joi";

export const newProductDataValidation = (req, res, next) => {
  const obj = {
    title: SHORT_STR_REQ,
    description: LONG_STR_REQ,
    stock: NUMBER_REQ,
    price: NUMBER_REQ,
    size: STR_ARRAY_REQ,
    brand: SHORT_STR_REQ,
    // imgUrl: LONG_STR_REQ,
    category: SHORT_STR_REQ,
    parentCategory: SHORT_STR_REQ,
  };
  validateData({ req, res, next, obj });
};

export const updateProductDataValidation = (req, res, next) => {
  const obj = {
    // _id: LONG_STR_REQ,
    title: SHORT_STR_REQ,
    description: LONG_STR_REQ,
    stock: NUMBER_REQ,
    price: NUMBER_REQ,
    size: STR_ARRAY_REQ,
    brand: SHORT_STR_REQ,
    parentCategory: LONG_STR_REQ,
    category: LONG_STR_REQ,
    // imgUrl: LONG_STR_REQ,
    imageList: Joi.alternatives()
      .try(Joi.array().items(Joi.string()), Joi.string())
      .optional(),
    color: Joi.array().items(Joi.string()).optional(),
  };
  validateData({ req, res, next, obj });
};
