import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Form from "./Form";
import formatCurrency from "../utils";
import Fade  from "react-reveal/Fade";
import { uiActions } from '../store/ui-slice';
import { cartActions } from "../store/cart-slice";


const Cart = ({ orderHandler }) => {
  const dispatch = useDispatch();
  const showForm = useSelector(state => state.ui.checkoutVisible);
  const cart = useSelector(state => state.cart);
  
  const checkoutHandler = () => {
    dispatch(uiActions.showCheckout());
  };

  const removeFromCartHandler = (id) => {
    dispatch(cartActions.removeFromCart(id))
  }


  return (
    <div>
      {cart.items.length === 0 ? (
        <div className="cart cart-header">Cart is empty </div>
      ) : (
        <div className="cart cart-header">
          You have {cart.totalQuantity} plants in the cart
        </div>
      )}
      <div>
        <div className="cart">
          <Fade left cascade>
            <ul className="cart-items">
              {cart.items.map((item) => (
                <li key={item.id}>
                  <div>
                    <img src={item.image} alt={item.title} />
                  </div>
                  <div>
                    <div>{item.title}</div>
                    <div className="right">
                      {item.quantity} x {formatCurrency(item.price)}{" "}
                      <button
                        className="button"
                        onClick={() => removeFromCartHandler(item.id)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </Fade>
        </div>
        {cart.items.length !== 0 && (
          <div>
            <div className="cart">
              <div className="total">
                <div>
                  Total:{" "}
                  {formatCurrency(
                    cart.items.reduce((a, c) => a + c.price * c.quantity, 0)
                  )}
                </div>
                <button onClick={checkoutHandler} className="button primary">
                  Continue
                </button>
              </div>
            </div>
            {showForm && (
              <Form  orderHandler={orderHandler} />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
