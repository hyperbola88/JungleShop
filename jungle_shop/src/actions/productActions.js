import { FETCH_PRODUCTS } from "../types";

export const fetchProducts = () => async (dispatch) => {
  const res = await fetch("/api/products");
  dispatch({ type: FETCH_PRODUCTS, payload: res.data });
};
