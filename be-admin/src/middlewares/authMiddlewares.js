import { getAdminByMail, getOneAdmin } from "../models/admin/AdminModel.js";
import { getSession } from "../models/session/SessionModel.js";
import {
  createAccessJwt,
  verifyAccessJWT,
  verifyRefreshJWT,
} from "../utils/jwt.js";
import { responseClient } from "../middlewares/responseClient.js";

export const adminAuthMiddleware = async (req, res, next) => {
  const { authorization } = req.headers;
  let message = "Unauthorized";

  if (authorization) {
    const token = authorization.split(" ")[1];
    const decoded = await verifyAccessJWT(token);
    console.log("decoded token", decoded);

    if (decoded?.email) {
      const tokenSession = await getSession({ token });
      console.log("token session", tokenSession);
      if (tokenSession?._id) {
        const admin = await getAdminByMail(decoded.email);
        if (admin?._id) {
          req.adminInfo = admin;
          return next();
        }
      }
    }
    message = decoded === "jwt expired" ? decoded : "Unauthorized";
  }
  responseClient({ req, res, message, statusCode: 401 });
};

export const renewAccessJWTMiddleware = async (req, res) => {
  const { authorization } = req.headers;
  let message = "Unauthorized";

  if (authorization) {
    const token = authorization.split(" ")[1];
    const decoded = verifyRefreshJWT(token);
    console.log("decoded token", decoded);

    if (decoded?.email) {
      const admin = await getOneAdmin({
        email: decoded.email,
        refreshJWT: token, // ✅ matches DB field now
      });
      if (admin?._id) {
        const newAccessToken = await createAccessJwt(decoded.email);
        return responseClient({
          req,
          res,
          message: "Here is the accessJWT",
          payload: newAccessToken,
        });
      }
    }
  }

  responseClient({ req, res, message, statusCode: 401 });
};
