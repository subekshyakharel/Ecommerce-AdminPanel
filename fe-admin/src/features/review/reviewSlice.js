import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  reviews: [],
  productReview: null,
};

const reviewSlice = createSlice({
  name: "review",
  initialState,
  reducers: {
    setReviews: (state, { payload }) => {
      state.reviews = payload;
    },
    setProductReview: (state, { payload }) => {
      state.productReview = payload;
    },
  },
});

const { reducer, actions } = reviewSlice;
export const { setReviews, setProductReview } = actions;

export default reducer;
