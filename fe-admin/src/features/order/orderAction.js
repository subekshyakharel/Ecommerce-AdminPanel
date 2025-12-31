import { fetchAllOrderApi, updateOrderApi } from "./orderApi";
import { setAllOrder } from "./orderSlice";

export const fetchAllOrderAction = () => async (dispatch) => {
  try {
    const { status, payload } = await fetchAllOrderApi();
    if (status == "success") {
      dispatch(setAllOrder(payload));
    }
  } catch (error) {
    console.log("Failed to fetch your order: ", error.message);
  }
};

// export const updateOrderAction = (id, payload) => async (dispatch) => {
//   try {
//     const { status, message } = await updateOrderApi(id, payload);
//     if(statu)
//   } catch (error) {
//     console.log(error.message);
//   }
// };
