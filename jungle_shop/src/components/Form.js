import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Fade from 'react-reveal/Fade';
import { fetchCartData } from "../store/cart-actions";
import { uiActions } from "../store/ui-slice";

const Form = ({ orderHandler }) => {
  const [emailInputInfo, setEmailInputInfo] = useState("");
  const [nameInputInfo, setNameInputInfo] = useState("");
  const [addressInputInfo, setAddressInputInfo] = useState("");
  const dispatch = useDispatch();

  const cart = useSelector(state => state.cart);
  const orderPlaced = useSelector(state => state.ui.orderPlaced);

  useEffect(() => {
    if(orderPlaced) {
    const timerId = setTimeout(() => {
      dispatch(uiActions.showOrderPlaced(false));
      localStorage.removeItem("cart");
      dispatch(fetchCartData());
      dispatch(uiActions.showCheckout(false));
    }, 2000)
    return () => {
      clearTimeout(timerId)}
  }}, [orderPlaced]);

  const emailInputHandler = (event) => {
    setEmailInputInfo(event.target.value);
  };

  const nameInputHandler = (event) => {
    setNameInputInfo(event.target.value);
  };

  const addressInputHandler = (event) => {
    setAddressInputInfo(event.target.value);
  };

  const createOrder = (event) => {
    event.preventDefault();
    dispatch(uiActions.showOrderPlaced(true));
    console.log("ordered!!");
    orderHandler({
      email: emailInputInfo,
      name: nameInputInfo,
      address: addressInputInfo,
      cartItems: cart,
    });
    setEmailInputInfo("");
    setNameInputInfo("");
    setAddressInputInfo("");
  };

  return (
    <div className="cart">
      {!orderPlaced && <form onSubmit={createOrder}>
         <Fade top cascade>
        <ul className="form-container">
          <li>
            <label>Email</label>
            <input
              value={emailInputInfo}
              name="email"
              type="email"
              onChange={emailInputHandler}
              required
            ></input>
          </li>
          <li>
            <label>Name</label>
            <input
              value={nameInputInfo}
              name="name"
              type="text"
              onChange={nameInputHandler}
              required
            ></input>
          </li>
          <li>
            <label>Address</label>
            <input
              value={addressInputInfo}
              name="address"
              type="text"
              onChange={addressInputHandler}
              required
            ></input>
          </li>
          <li>
            <button className="button primary">Submit</button>
          </li>
        </ul>
        </Fade>
      </form>}
      {orderPlaced && <div className="order-message">Thanks for your Order!</div>}
    </div>
  );
};

export default Form;
