import React from "react";
import formatCurrency from "../utils";

const Products = (props) => {

  return (
    <div>
      <ul className="products">
        {props.products.map((product) => (
          <li key={product._id}>
            <div className="product">
              <a href={"#" + product._id}>
                <img src={product.image} alt="product"></img>
                <p>{product.title}</p>
              </a>
              <div className="product-price">
                 <div>
                    {formatCurrency(product.price)}
                 </div>
                 <button className="button primary" onClick={() => props.addToCart(product)}>
                    Add to cart
                 </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Products;
