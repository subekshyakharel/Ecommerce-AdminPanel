import { v4 as uuidv4 } from "uuid";
import { comparePassword, hashPassword } from "../utils/bcrypt.js";
import {
  createNewAdmin,
  getAdminByMail,
  getAllAdmin,
  updateAdmin,
} from "../models/admin/AdminModel.js";
import {
  createNewSession,
  deleteManySession,
} from "../models/session/SessionModel.js";
import { responseClient } from "../middlewares/responseClient.js";
import { getjwts } from "../utils/jwt.js";

export const insertNewAdmin = async (req, res, next) => {
  try {
    console.log(req.body);
    const { password } = req.body;
    req.body.password = await hashPassword(password);

    const admin = await createNewAdmin(req.body);

    if (admin?._id) {
      const newSessionObj = {
        token: uuidv4(),
        association: admin.email,
      };
      const session = await createNewSession(newSessionObj);
      if (session?._id) {
        const message = "Admin created successfully.";
        return responseClient({ req, res, message });
      }
    }

    throw new Error("Unable to create admin. try again later");
  } catch (error) {
    if (error.message.includes("E11000 duplicate key error collection")) {
      error.message =
        "The email already exists for another user. Try a different email or reset your password.";
      error.statusCode = 400;
    }
    next(error);
  }
};

export const loginAdmin = async (req, res, next) => {
  try {
    const { password, email } = req.body;
    const admin = await getAdminByMail(email);
    if (admin?._id) {
      const isMatched = await comparePassword(password, admin.password);
      if (isMatched) {
        console.log("AdminAuthenticated");
        const jwts = await getjwts(email);
        console.log("Sending login response with tokens:", jwts);

        return responseClient({
          req,
          res,
          next,
          message: "Logged in successfully!",
          payload: jwts,
        });
      }
    }

    const message = "Invalid login details";
    const statusCode = 401;
    responseClient({ req, res, next, message, statusCode });
  } catch (error) {
    next(error);
  }
};

export const getAllAdminController = async (req, res, next) => {
  try {
    const admins = await getAllAdmin();

    if (!admins || admins.length === 0) {
      // No admins found
      return res.status(404).json({
        status: "success",
        message: "No admins found",
        payload: [],
      });
    }

    // If admins found, send them
    return res.status(200).json({
      status: "success",
      message: "Here are all the admins",
      payload: admins,
    });
  } catch (error) {
    next(error);
  }
};

export const logoutAdmin = async (req, res, next) => {
  try {
    //get the token
    const { email } = req.adminInfo;
    //Update refreshJWT to ""
    await updateAdmin({ email }, { refresh: "" });
    //remove the accessJWt from session table
    await deleteManySession({ req, res, message: "loged out successfully" });
  } catch (error) {
    next(error);
  }
};
