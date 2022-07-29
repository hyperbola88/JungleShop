import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Filter from "./components/Filter";
import Products from "./components/Products";
import Cart from "./components/Cart";
import { fetchCartData, sendCartData } from "./store/cart-actions2";
import { fetchProducts } from "./store/product-actions";


function App() {
  const dispatch = useDispatch();

  const products = useSelector((state) => state.products.products);
  const cart = useSelector((state) => state.cart);

  const [orderInfo, setOrderInfo] = useState({});

  useEffect(() => {
    dispatch(fetchCartData());
    dispatch(fetchProducts());
  }, [dispatch]);

  useEffect(() => {
    if (cart.changed) {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [cart, dispatch]);

  console.log(cart.totalQuantity);

  const orderHandler = (order) => {
    setOrderInfo(order);
    console.log(orderInfo);
  };


  return (
    <div className="grid-container">
      <header>
        <a href="/">Jungle Shop</a>
      </header>
      <main>
        <div className="content">
          <div className="main">
            <Filter />
            <Products products={products} />
          </div>
          <div className="sidebar">
            <Cart orderHandler={orderHandler}/>
          </div>
        </div>
      </main>
      <footer>All rights reserved by Me</footer>
    </div>
  );
}

export default App;
