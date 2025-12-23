import jwt from "jsonwebtoken";
import { createNewSession } from "../models/session/SessionModel.js";
import { updateAdmin } from "../models/admin/AdminModel.js";

//create access jwt
export const createAccessJwt = async (email) => {
  const token = jwt.sign({ email }, process.env.ACCESS_JWT, {
    expiresIn: "1d",
  });
  //store
  const obj = {
    token,
    association: email,
    expire: new Date(Date.now() + 24 * 60 * 60 * 1000),
  };
  const newSessions = await createNewSession(obj);
  return newSessions?._id ? token : null;
};

//verify access jwt
export const verifyAccessJWT = (token) => {
  try {
    console.log(token);
    return jwt.verify(token, process.env.ACCESS_JWT);
  } catch (error) {
    console.log(error);
    return error.message;
  }
};

//create refershJwt
const createRefereshJWT = async (email) => {
  const refreshJWT = jwt.sign({ email }, process.env.REFRESH_JWT, {
    expiresIn: "30d",
  });

  //store
  const user = await updateAdmin({ email }, { refreshJWT });
  return user?._id ? refreshJWT : null;
};

// verify refreshJWt

export const verifyRefreshJWT = (token) => {
  try {
    console.log(token);
    return jwt.verify(token, process.env.REFRESH_JWT);
  } catch (error) {
    console.log(error.message);
    return error.message;
  }
};

export const getjwts = async (email) => {
  return {
    accessJWT: await createAccessJwt(email),
    refreshJWT: await createRefereshJWT(email),
  };
};
