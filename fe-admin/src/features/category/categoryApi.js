import { apiProcessor } from "../../services/api.js";

const apibaseUrl = import.meta.env.VITE_BASE_URL;
const categoryApiEp = apibaseUrl + "/api/v1/category";

export const postCategoryApi = async (payload) => {
  try {
    const obj = {
      method: "post",
      url: categoryApiEp,
      showToast: "true",
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

export const fetchAllCategories = async () => {
  const obj = {
    method: "get",
    url: categoryApiEp + "/allCategory",
    isPrivateCall: false,
    showToast: false,
  };
  const result = await apiProcessor(obj);
  return result;
};

export const fetchParentCategories = async () => {
  const obj = {
    method: "get",
    url: categoryApiEp + "/parent",
    isPrivateCall: false,
    showToast: false,
  };
  const result = await apiProcessor(obj);
  return result;
};

export const deleteSubCatApi = async (id) => {
  const obj = {
    method: "delete",
    url: categoryApiEp + "/deleteSubCat/" + id,
    isPrivateCall: true,
    showToast: true,
  };
  const result = await apiProcessor(obj);
  return result;
};
