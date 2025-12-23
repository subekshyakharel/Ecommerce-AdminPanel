import {
  fetchAllProductApi,
  fetchSingleProductApi,
  postProductApi,
  updateProductApi,
} from "./productApi.js";
import { setAllProduct, setProduct } from "./productSlice.js";

export const postProductAction = async (payload, navigate) => {
  const { status, message } = await postProductApi(payload);
  return { status, message };
};

export const fetchAllProductAction = () => async (dispatch) => {
  const { status, payload } = await fetchAllProductApi();

  if (status === "success" && Array.isArray(payload)) {
    dispatch(setAllProduct(payload));
  }
};

export const fetchSingleProductAction = (id) => async (dispatch) => {
  const { status, payload } = await fetchSingleProductApi(id);
  if (status == "success") {
    dispatch(setProduct(payload));
  }
};

export const updateProductAction = (id, payload) => async (dispatch) => {
  const { status, message } = await updateProductApi(id, payload);
  return { status, message };
};
