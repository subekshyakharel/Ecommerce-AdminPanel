import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allCategory: [],
  parentCategory: [],
};

const userSlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    setAllCategory: (state, action) => {
      state.allCategory = action.payload;
    },
    setParentCategory: (state, action) => {
      state.parentCategory = action.payload;
    },
  },
});

const { reducer, actions } = userSlice;

export const { setAllCategory, setParentCategory } = actions;

export default reducer;
