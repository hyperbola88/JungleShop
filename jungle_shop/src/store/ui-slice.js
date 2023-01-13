import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "ui",
  initialState: {
    checkoutVisible: false,
    modalVisible: null,
    logInOpen: false,
    signUpOpen: false,
    isLoading: false,
    token: null,
    showProfile: false,
    remaningTime: 0,
    orderPlaced: false
  },
  reducers: {
    showCheckout(state, action) {
      state.checkoutVisible = action.payload;
    },
    showModal(state, action) {
      state.modalVisible = action.payload;
    },
    closeModal(state) {
      state.modalVisible = null;
    },
    toggleLogIn(state, action) {
      state.logInOpen = action.payload;
    },
    toggleSignUp(state, action) {
      state.signUpOpen = action.payload;
    },
    toggleIsLoading(state, action) {
      state.isLoading = action.payload;
    },
    loginHandler(state, action) {
      state.token = action.payload;
      //localStorage.setItem("token", action.payload);
    },
    logoutHandler(state, action) {
      state.token = null;
      state.remaningTime = 0;
      state.showProfile = false;
    },
    toggleProfile(state, action) {
      state.showProfile = action.payload;
    },
    setToken(state, action) {
      state.token = action.payload;
    },
    setRemaningTime(state,action) {
      state.remaningTime = action.payload;
    },
    showOrderPlaced(state, action) {
      state.orderPlaced = action.payload;
      //state.checkoutVisible = false;
    } 
  },
});

export const uiActions = uiSlice.actions;

export default uiSlice;
