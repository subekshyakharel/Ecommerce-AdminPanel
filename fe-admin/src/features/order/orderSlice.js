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
  },
});

const { reducer, actions } = orderSlice;

export const { setAllOrder } = actions;

export default reducer;
