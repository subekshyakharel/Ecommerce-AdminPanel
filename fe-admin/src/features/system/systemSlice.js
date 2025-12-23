import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  modalShow: false,
  modalContent: {
    title: "Hey this is title",
    content: "hey this is content",
  },
};

const systemSlice = createSlice({
  name: "system",
  initialState,
  reducers: {
    setmodalShow: (state, { payload }) => {
      state.modalShow = payload;
    },
    setModalContent: (state, { payload }) => {
      state.modalContent = payload;
    },
  },
});

const { reducer, actions } = systemSlice;

export const { setmodalShow, setModalContent } = actions;

export default reducer;
