import { createSlice } from "@reduxjs/toolkit";

const productsSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    sort: "newest",
  },
  reducers: {
    setProducts(state, action) {
      const fetchedProducts = action.payload;
      const products = [];
      for (const key in fetchedProducts) {
        products.push({
          id: key,
          title: fetchedProducts[key].title,
          description: fetchedProducts[key].description,
          price: fetchedProducts[key].price,
          image: fetchedProducts[key].image,
        });
        state.products = products;
      }
    },
    sortProducts(state, action) {
      const e = action.payload;
      state.sort = e;
      if (e === "newest") {
        state.products = state.products.sort((a, b) => (a.id > b.id ? 1 : -1));
      }
      if (e === "lowest") {
        state.products = state.products.sort((a, b) =>
          a.price > b.price ? 1 : -1
        );
      } else if (e === "highest") {
        state.products = state.products.sort((a, b) =>
          a.price > b.price ? -1 : 1
        );
      }
    },
  },
});

export const productsActions = productsSlice.actions;

export default productsSlice;
