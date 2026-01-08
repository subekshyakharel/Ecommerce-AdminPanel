import {
  deleteSubCatApi,
  fetchAllCategories,
  fetchParentCategories,
  postCategoryApi,
} from "./categoryApi.js";
import { setAllCategory, setParentCategory } from "./categorySlice.js";

export const postCategoryAction = async (payload) => {
  const { status, message } = await postCategoryApi(payload);
  return { status, message };
};

export const fetchAllCategoriesAction = () => async (dispatch) => {
  try {
    const { status, payload } = await fetchAllCategories();
    if (status === "success") {
      dispatch(setAllCategory(payload));
    }
  } catch (error) {
    console.error("Failed to fetch categories:", error);
  }
};

export const fetchParentCategoriesAction = () => async (dispatch) => {
  try {
    const { status, payload } = await fetchParentCategories();
    if (status === "success") {
      dispatch(setParentCategory(payload));
    }
  } catch (error) {
    console.error("Failed to fetch categories:", error);
  }
};

// export const deleteSubCatAction = (id) => async (dispatch) => {
//   try {
//     const { status, message } = await deleteSubCatApi(id);
//     if(status==="success")
//   } catch (error) {
//     console.error(error);
//   }
// };
