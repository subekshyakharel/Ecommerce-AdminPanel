import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  admin: {},
  allAdmins: [],
};

const userSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    setAdmin: (state, action) => {
      state.admin = action.payload;
    },
    setAllAdmins: (state, action) => {
      state.allAdmins = action.payload;
    },
  },
});

const { reducer, actions } = userSlice;

export const { setAdmin, setAllAdmins } = actions;

export default reducer;
