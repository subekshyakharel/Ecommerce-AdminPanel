import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  product: {},
  allProduct: [],
};

const userSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    setProduct: (state, action) => {
      state.product = action.payload;
    },
    setAllProduct: (state, action) => {
      state.allProduct = action.payload;
    },
  },
});

const { reducer, actions } = userSlice;

export const { setProduct, setAllProduct } = actions;

export default reducer;
