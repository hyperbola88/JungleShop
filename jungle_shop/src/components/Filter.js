import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { productsActions } from "../store/products-slice";

const Filter = (props) => {

  const dispatch = useDispatch();
  const sort = useSelector(state => state.products.sort);

  const sortHandler = (event) => {
    dispatch(productsActions.sortProducts(event.target.value));
  }

  return (
    <div className="filter">
      <div className="filter-result">{props.count} Products</div>
      <div className="filter-sort">
        Sort {" "}
        <select value={sort} onChange={sortHandler}>
          <option value="newest">Newest</option>
          <option value="lowest">Lowest</option>
          <option value="highest">Highest</option>
        </select>
      </div>
    </div>
  );
};

export default Filter;
