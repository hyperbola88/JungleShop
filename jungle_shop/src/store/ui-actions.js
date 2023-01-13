import { uiActions } from "./ui-slice";

 export const setLocalToken = (token) => {
   return (dispatch) => {
      try {
         localStorage.setItem("token", token);
         dispatch(uiActions.loginHandler(token));
      } catch(error) {
         console.log(error);
      }
   }
 };

 export const removeLocalToken = () => {
   return (dispatch) => {
      try {
         localStorage.removeItem("token");
         dispatch(uiActions.logoutHandler());
      } catch(error) {
         console.log(error);
      }
   }
 };