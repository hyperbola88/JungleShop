import React, { useState } from "react";
import Form from "./Form";
import formatCurrency from "../utils";

const Cart = ({ cartItems, removeFromCart, orderHandler }) => {
  const [showCheckout, setShowCheckout] = useState(false);

  const checkoutHandler = () => {
    setShowCheckout(true);
  };

  return (
    <div>
      {cartItems.length === 0 ? (
        <div className="cart cart-header">Cart is empty </div>
      ) : (
        <div className="cart cart-header">
          You have {cartItems.length} items in the cart
        </div>
      )}
      <div>
        <div className="cart">
          <ul className="cart-items">
            {cartItems.map((item) => (
              <li key={item._id}>
                <div>
                  <img src={item.image} alt={item.title} />
                </div>
                <div>
                  <div>{item.title}</div>
                  <div className="right">
                    {item.count} x {formatCurrency(item.price)}{" "}
                    <button
                      className="button"
                      onClick={() => removeFromCart(item._id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
        {cartItems.length !== 0 && (
          <div>
            <div className="cart">
              <div className="total">
                <div>
                  Total:{" "}
                  {formatCurrency(
                    cartItems.reduce((a, c) => a + c.price * c.count, 0)
                  )}
                </div>
                <button onClick={checkoutHandler} className="button primary">
                  Continue
                </button>
              </div>
            </div>
            {showCheckout && (
              <Form cartItems={cartItems} orderHandler={orderHandler}/>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
