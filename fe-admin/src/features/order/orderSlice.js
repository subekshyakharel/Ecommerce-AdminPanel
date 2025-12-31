import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allOrder: [],
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    setAllOrder: (state, { payload }) => {
      state.allOrder = payload;
    },
    updateOrder: (state, { payload }) => {
      state.allOrder = state.allOrder.map((order) =>
        order._id === payload._id ? payload : order
      );
    },
  },
});

const { reducer, actions } = orderSlice;

export const { setAllOrder, updateOrder } = actions;

export default reducer;
