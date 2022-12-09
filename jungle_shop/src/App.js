import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Filter from "./components/Filter";
import Products from "./components/Products";
import Cart from "./components/Cart";
import Header from "./components/Header";
import Profile from "./components/Profile";
import { fetchCartData, sendCartData } from "./store/cart-actions";
import { fetchProducts } from "./store/product-actions";
import { uiActions } from "./store/ui-slice";


function App() {
  const dispatch = useDispatch();

  const products = useSelector((state) => state.products.products);
  const cart = useSelector((state) => state.cart);
  const ui = useSelector((state) => state.ui);

  const [orderInfo, setOrderInfo] = useState({});

  useEffect(() => {
    dispatch(fetchCartData());
    dispatch(fetchProducts());
    if (localStorage.getItem("token")) {
      dispatch(uiActions.setToken(localStorage.getItem("token")));
    }; 
  }, [dispatch]);

  useEffect(() => {
    if (cart.changed) {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [cart]);


  const orderHandler = (order) => {
    dispatch(sendCartData(order));
    console.log(order);
  };


  return (
    <div className="grid-container">
      <Header />
      <main>
        <div className="content">
          <div className="main">
            <Filter />
            <Products products={products} />
          </div>
          <div className="sidebar">
            {!ui.showProfile && <Cart orderHandler={orderHandler}/>}
            {ui.showProfile && <Profile />}
          </div>
        </div>
      </main>
      <footer>All rights reserved by Me</footer>
    </div>
  );
}

export default App;
