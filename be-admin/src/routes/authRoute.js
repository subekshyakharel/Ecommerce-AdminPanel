import express from "express";
import {
  insertNewAdmin,
  loginAdmin,
  logoutAdmin,
} from "../controller/authController.js";
import {
  loginDataValidation,
  newAdminDataValidation,
} from "../middlewares/validations/authDataValidation.js";
import {
  adminAuthMiddleware,
  renewAccessJWTMiddleware,
} from "../middlewares/authMiddlewares.js";

const router = express.Router();

router.post("/register", newAdminDataValidation, insertNewAdmin);
router.post("/login", loginDataValidation, loginAdmin);
router.get("/renew-jwt", renewAccessJWTMiddleware);
router.get("/logout", adminAuthMiddleware, logoutAdmin);

export default router;
