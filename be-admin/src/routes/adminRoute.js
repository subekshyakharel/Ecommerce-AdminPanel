import express from "express";
import { responseClient } from "../middlewares/responseClient.js";
import { adminAuthMiddleware } from "../middlewares/authMiddlewares.js";
import { getAllAdminController } from "../controller/authController.js";

const router = express.Router();

router.get("/profile", adminAuthMiddleware, (req, res) => {
  const admin = req.adminInfo;
  admin.password = undefined;
  admin.__v = undefined;
  admin.refreshJWT = undefined;
  return responseClient({
    req,
    res,
    message: "Admin Profile",
    payload: admin,
  });
});

router.get("/alladmin", adminAuthMiddleware, getAllAdminController);

export default router;
