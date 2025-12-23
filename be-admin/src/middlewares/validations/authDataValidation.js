import {
  EMAIL_REQ,
  PASSWORD_REQ,
  PHONE_REQ,
  SHORT_STR_REQ,
} from "./joiConst.js";
import { validateData } from "./joiValidation.js";

export const newAdminDataValidation = (req, res, next) => {
  const obj = {
    fName: SHORT_STR_REQ,
    lName: SHORT_STR_REQ,
    email: EMAIL_REQ,
    phone: PHONE_REQ,
    password: PASSWORD_REQ,
  };
  validateData({ req, res, next, obj });
};

export const loginDataValidation = (req, res, next) => {
  const obj = {
    email: EMAIL_REQ,
    password: PASSWORD_REQ,
  };
  validateData({ req, res, next, obj });
};
