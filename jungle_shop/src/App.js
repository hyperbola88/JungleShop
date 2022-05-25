import React from 'react';
import { useState } from 'react';
import Filter from './components/Filter';
import Products from './components/Products';
import Cart from './components/Cart';
import data from './data.json';


function App() {

  const initialCartState = localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")) : [];

  const [products, setProducts] = useState(data.products);
  const [size, setSize] = useState('');
  const [sort, setSort] = useState('newest');
  const [cartItems, setCartItems] = useState(initialCartState);
  const [orderInfo, setOrderInfo] = useState({});

  const sortProducts = (event) => {
    const e = event.target.value;
    setSort(e);
    setProducts(prev => {
      const sorted = prev.slice();
      if (e === "newest") {
        return sorted.sort((a , b) => a._id < b._id ? 1 : -1); 
      }
      if (e === "lowest") {
        console.log(e);
        return sorted.sort((a , b) => a.price > b.price ? 1 : -1);
      } else {
        console.log(e);
        return sorted.sort((a , b) => - 1);;
      }
    });
  }

  const filterProducts = (event) => {
    if(event.target.value === ''){
      setProducts(data.products);
    } else {
      setSize(event.target.value);
      setProducts(data.products.filter(product => product.availableSizes.indexOf(event.target.value) >=0));
    }
  }


  const addToCart = (product) => {
    let alreadyInCart = false;
    const addedToCart = cartItems.slice();
    addedToCart.forEach(item => {
      if(item._id === product._id) {
        item.count ++;
        alreadyInCart = true;
      }
    });
    if(!alreadyInCart) {
      addedToCart.push({...product, count: 1})
    };
    setCartItems(addedToCart);
    localStorage.setItem("cartItems", JSON.stringify(addedToCart));
  };

  const removeFromCart = (id) => {
    setCartItems((prev) => {
      const updated = prev.filter(x => x._id !== id);
      localStorage.setItem("cartItems", JSON.stringify(updated));
      return updated;
    })
  }

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
            <Filter count={products.length} size={size} sort={sort} sortProducts={sortProducts} filterProducts={filterProducts}/>
            <Products products={products} addToCart={addToCart}/>
          </div>
          <div className='sidebar'>
            <Cart cartItems={cartItems} removeFromCart={removeFromCart} orderHandler={orderHandler}/>
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
