import { getASingleReviewByIdApi, getReviewedProductApi } from "./reviewApi";
import { setProductReview, setReviews } from "./reviewSlice";

export const getReviewedProductAction = () => async (dispatch) => {
  const { status, message, payload } = await getReviewedProductApi();
  if (status === "success") {
    dispatch(setReviews(payload));
  }
};

export const getASingleReviewByIdAction = (id) => async (dispatch) => {
  const { status, message, payload } = await getASingleReviewByIdApi(id);
  console.log(payload);
  if (status === "success") {
    dispatch(setProductReview(payload));
  }
};
