import joi from "joi";
import { responseClient } from "../responseClient.js";

export const validateData = ({ req, res, next, obj }) => {
  const schema = Array.isArray(req.body)
    ? joi.array().items(joi.object(obj)).min(1).required()
    : joi.object(obj);

  const { error } = schema.validate(req.body);

  if (error) {
    return responseClient({
      req,
      res,
      message: error.message,
      statusCode: 400,
    });
  }
  next();
};
