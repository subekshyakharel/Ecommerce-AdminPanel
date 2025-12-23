import { apiProcessor } from "../../services/api";

const apibaseUrl = import.meta.env.VITE_BASE_URL;
const adminApiEp = apibaseUrl + "/api/v1/admins";

//call api to fetch the admin
export const fetchAdminApi = async () => {
  try {
    const obj = {
      method: "get",
      url: adminApiEp + "/profile",
      showToast: false,
      isPrivateCall: true,
    };
    const result = await apiProcessor(obj);
    console.log(result);
    return result;
  } catch (error) {
    return {
      status: "error",
      message: error.message,
    };
  }
};

export const fetchAllAdminApi = async () => {
  try {
    const obj = {
      method: "get",
      url: adminApiEp + "/alladmin",
      isPrivateCall: true,
    };
    const result = await apiProcessor(obj);
    console.log(result);
    return result;
  } catch (error) {
    return {
      status: "error",
      message: error.message,
    };
  }
};
