import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "ui",
  initialState: { checkoutVisible: false, modalVisible: null },
  reducers: {
    showCheckout(state) {
      state.checkoutVisible = true;
    },
    showModal(state, action) {
       state.modalVisible = action.payload;
    },
    closeModal(state) {
      state.modalVisible = null;
    }
  },
});

export const uiActions = uiSlice.actions;

export default uiSlice;
