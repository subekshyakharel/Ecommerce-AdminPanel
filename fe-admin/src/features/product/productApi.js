import { apiProcessor } from "../../services/api";

const apibaseUrl = import.meta.env.VITE_BASE_URL;
const adminApiEp = apibaseUrl + "/api/v1/product";

//call api to fetch the admin
export const postProductApi = async (payload) => {
  try {
    const obj = {
      method: "post",
      url: adminApiEp,
      showToast: true,
      isPrivateCall: true,
      payload,
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

export const fetchAllProductApi = async () => {
  try {
    const obj = {
      method: "get",
      url: adminApiEp + "/getAllProduct",
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

export const fetchSingleProductApi = async (id) => {
  try {
    const obj = {
      method: "get",
      url: adminApiEp + "/public/" + id,
    };
    const result = await apiProcessor(obj);
    return result;
  } catch (error) {
    return {
      status: "error",
      message: error.message,
    };
  }
};

export const deleteProductApi = async (id) => {
  try {
    const obj = {
      method: "delete",
      url: adminApiEp + `/${id}`,
      showToast: true,
      isPrivateCall: true,
    };
    return apiProcessor(obj);
  } catch (error) {
    return {
      status: "error",
      message: error.message,
    };
  }
};

export const updateProductApi = async (id, payload) => {
  const obj = {
    method: "put",
    url: adminApiEp + `/update/${id}`,
    payload,
    isPrivateCall: true,
    showToast: true,
  };
  return apiProcessor(obj);
};
