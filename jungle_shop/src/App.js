import React, { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Filter from './components/Filter';
import Products from './components/Products';
import Cart from './components/Cart';
import { fetchCartData, sendCartData } from './store/cart-actions';

let isInitial = true;

function App() {

  const dispatch = useDispatch();

  const products = useSelector(state => state.products.products);
  const cart = useSelector(state => state.cart);

  const [orderInfo, setOrderInfo] = useState({});

  useEffect(() => {
    dispatch(fetchCartData());
  }, [dispatch]);

  useEffect(() => {
    if(isInitial) {
      isInitial = false;
      return;
    };
    if(cart.changed) {
      dispatch(sendCartData(cart));
      console.log('changed' + cart);
    }
  }, [cart, dispatch])

  
  const orderHandler = (order) => {
    setOrderInfo(order);
  }

  return (
    <div className="grid-container">
      <header>
        <a href='/'>Jungle Shop</a>
      </header>
      <main>
        <div className='content'>
          <div className='main'>
            <Filter count={products.length} />
            <Products products={products}/>
          </div>
          <div className='sidebar'>
            <Cart/>
          </div>
        </div>
      </main>
      <footer>
        All rights reserved by Me
      </footer>
    </div>
  );
}

export default App;
