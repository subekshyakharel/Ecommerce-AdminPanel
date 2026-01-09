import { apiProcessor } from "./api";

const apibaseUrl = import.meta.env.VITE_BASE_URL;
// || "http://localhost:2000";
const authApi = apibaseUrl + "/api/v1/auth";

export const signupNewAdminApi = async (payload) => {
  try {
    const obj = {
      method: "post",
      url: authApi + "/register",
      payload,
      showToast: true,
    };
    const result = await apiProcessor(obj);
    return result;
  } catch (error) {
    console.log(error.message);
    return {
      status: "error",
      message: error.message,
    };
  }
};

export const loginAdminApi = async (payload) => {
  const obj = {
    method: "post",
    url: authApi + "/login",
    payload,
    showToast: true,
  };
  return apiProcessor(obj);
};

//request new accessJWT api
export const fetchNewAccessJWTApi = async () => {
  try {
    const obj = {
      method: "get",
      url: authApi + "/renew-jwt",
      isPrivateCall: true,
      isRefreshJWT: true,
    };
    return apiProcessor(obj);
  } catch (error) {
    return {
      status: "error",
      message: error.message,
    };
  }
};

export const logoutAdminApi = async () => {
  const obj = {
    method: "get",
    url: authApi + "/logout",
    isPrivateCall: true,
  };
  return apiProcessor(obj);
};
