import React from "react";

const Filter = (props) => {
  return (
    <div className="filter">
      <div className="filter-result">{props.count} Products</div>
      <div className="filter-sort">
        Sort {" "}
        <select value={props.sort} onChange={props.sortProducts}>
          <option value="newest">Newest</option>
          <option value="lowest">Lowest</option>
          <option value="highest">Highest</option>
        </select>
      </div>
      <div className="filter-size">
        Filter {" "}
        <select value={props.size} onChange={props.filterProducts}>
          <option value="">All</option>
          <option value="small">Small</option>
          <option value="medium">Medium</option>
          <option value="large">Large</option>
        </select>
      </div>
    </div>
  );
};

export default Filter;
