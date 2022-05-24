import React from 'react';
import { useState } from 'react';
import Filter from './components/Filter';
import Products from './components/Products';
import data from './data.json';


function App() {
  const [products, setProducts] = useState(data.products);
  const [size, setSize] = useState('');
  const [sort, setSort] = useState('newest');

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

  return (
    <div className="grid-container">
      <header>
        <a href='/'>Jungle Shop</a>
      </header>
      <main>
        <div className='content'>
          <div className='main'>
            <Filter count={products.length} size={size} sort={sort} sortProducts={sortProducts} filterProducts={filterProducts}/>
            <Products products={products} />
          </div>
          <div className='sidebar'>
            Cart Items
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
