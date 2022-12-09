import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { uiActions } from "../store/ui-slice";
import LogInModal from "./LogInModal";


const Header = () => {
   const dispatch = useDispatch();
   const ui = useSelector(state => state.ui);
   const cart = useSelector(state => state.cart.items.length);

   const logInlHandler = () => {
      dispatch(uiActions.toggleLogIn(true));
   };

   const sighUpHandler = () => {
      dispatch(uiActions.toggleSignUp(true));
      dispatch(uiActions.toggleLogIn(true));
   }

   const logOutHandler = () => {
      dispatch(uiActions.logoutHandler());
      dispatch(uiActions.toggleProfile(false));
   }

   const userProfileHandler = () => {
      dispatch(uiActions.toggleProfile(true));
      dispatch(uiActions.showCheckout(false));
      window.scrollTo({
         top: 0,
         behavior: 'smooth'
       });
   };

   const backToCartHandler = () => {
      dispatch(uiActions.toggleProfile(false));
      dispatch(uiActions.showCheckout(false));
      window.scrollTo({
         top: 0,
         behavior: 'smooth'
       });
   }
   
  return (
    <header>
      <div>
      <a href="/">Jungle Shop</a>
      </div>
      <div>
         {!ui.token && <button className="header-button" onClick={sighUpHandler}>SignUp</button>}
         {!ui.token && <button onClick={logInlHandler} className="header-button">LogIn</button>}
         {ui.token && <button onClick={logOutHandler} className="header-button">LogOut</button>}
         {ui.token && !ui.showProfile && <button className="header-button" onClick={userProfileHandler}>User Profile</button>}
         {ui.logInOpen && <LogInModal toggleModalHandler={logInlHandler}/>}
         {cart && <button className="header-button" onClick={backToCartHandler}>Cart</button>}
      </div>
    </header>
  );
};

export default Header;
