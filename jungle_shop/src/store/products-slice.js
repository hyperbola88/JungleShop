import { createSlice } from "@reduxjs/toolkit";

const DUMMY_PRODUCTS = [
  {
    id: 1,
    title: "Monstera",
    description:
      "An interesting species from the bromeliad family which produces a red center within the rosette of leaves.",
    price: 15,
    image: "/images/plant1.jpeg"
  },
  {
    id: 2,
    title: "Monstera",
    description:
      "An interesting species from the bromeliad family which produces a red center within the rosette of leaves.",
    price: 11,
    image: "/images/plant2.jpeg"
  },
  {
    id: 3,
    title: "Monstera",
    description:
      "An interesting species from the bromeliad family which produces a red center within the rosette of leaves.",
    price: 12,
    image: "/images/plant3.jpeg"
  },
  {
    id: 4,
    title: "Monstera",
    description:
      "An interesting species from the bromeliad family which produces a red center within the rosette of leaves.",
    price: 13,
    image: "/images/plant4.jpeg",
  },
  {
    id: 5,
    title: "Monstera",
    description:
      "An interesting species from the bromeliad family which produces a red center within the rosette of leaves.",
    price: 14,
    image: "/images/plant5.jpeg",
  },
  {
    id: 6,
    title: "Monstera",
    description:
      "An interesting species from the bromeliad family which produces a red center within the rosette of leaves.",
    price: 10,
    image: "/images/plant6.jpeg",
  },
];

const productsSlice = createSlice({
  name: "products",
  initialState: {
    products: DUMMY_PRODUCTS,
    sort: "newest",
  },
  reducers: {
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
