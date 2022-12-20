import React, { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";

import Form from "./Form";
import formatCurrency from "../utils";
import Fade from "react-reveal/Fade";
import { uiActions } from "../store/ui-slice";
import { cartActions } from "../store/cart-slice";

const Cart = ({ orderHandler }) => {
  const dispatch = useDispatch();
  const ui = useSelector((state) => state.ui);
  const showForm = useSelector((state) => state.ui.checkoutVisible);
  const cart = useSelector((state) => state.cart);

  const checkoutHandler = () => {
    if (ui.token) {
      dispatch(uiActions.showCheckout(true));
    } else {
      dispatch(uiActions.toggleLogIn(true));
    }
  };

  const removeFromCartHandler = (id) => {
    dispatch(cartActions.removeFromCart(id));
  };

  return (
    <div className="cart-side">
      {cart.items.length === 0 ? (
        <Fragment>
          <div className="cart cart-header">Cart is empty </div>
          <div className="empty">
            <Fade bottom cascade>
              <h1>It's time</h1>
              <h1>to set up</h1>
              <h1>your own jungles</h1>
            </Fade>
          </div>
        </Fragment>
      ) : (
        <Fragment>
          {cart.items.length === 1 ? (
            <div className="cart cart-header">You have 1 plant in the cart</div>
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
                    <button
                      onClick={checkoutHandler}
                      className="button primary"
                    >
                      Continue
                    </button>
                  </div>
                </div>
                {showForm && <Form orderHandler={orderHandler} />}
              </div>
            )}
          </div>
        </Fragment>
      )}
    </div>
  );
};

export default Cart;
