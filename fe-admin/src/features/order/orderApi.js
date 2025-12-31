import { apiProcessor } from "../../services/api";

const apibaseUrl = import.meta.env.VITE_BASE_URL_CLIENT;
const orderApiEp = apibaseUrl + "/api/v1/order";

export const fetchAllOrderApi = async () => {
  const obj = {
    method: "get",
    url: orderApiEp + "/all-order",
  };
  const result = await apiProcessor(obj);
  return result;
};

export const updateOrderApi = async (id, payload) => {
  const obj = {
    method: "patch",
    url: orderApiEp + "/" + id,
    payload,
    showToast: true,
  };
  const result = await apiProcessor(obj);
  return result;
};
