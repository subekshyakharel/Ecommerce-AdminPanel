import { apiProcessor } from "../../services/api";

const apibaseUrl = "http://localhost:3000";
const reviewEpApi = apibaseUrl + "/api/v1";

export const getReviewedProductApi = async () => {
  const obj = {
    method: "get",
    url: reviewEpApi + "/order/getProductReview",
  };
  return apiProcessor(obj);
};

export const getASingleReviewByIdApi = async (id) => {
  const obj = {
    method: "get",
    url: reviewEpApi + "/review/" + id,
  };
  return apiProcessor(obj);
};
