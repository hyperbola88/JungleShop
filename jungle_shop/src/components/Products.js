import React from "react";
import formatCurrency from "../utils";

const Products = (props) => {
  return (
    <div>
      <ul className="products">
        {props.products.map((product) => (
          <li key={Products.id}>
            <div className="product">
              <a href={"#" + product._id}>
                <img src={product.image} alt="product image"></img>
                <p>{product.title}</p>
              </a>
              <div className="product-price">
                 <div>
                    {formatCurrency(product.price)}
                 </div>
                 <button className="button primary">
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
