import { productsActions } from "./products-slice";

export const fetchProducts = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await fetch(
        "https://jungle-shop-2b49f-default-rtdb.europe-west1.firebasedatabase.app/products.json"
      );
      if (!response.ok) {
        throw new Error("something went wrong");
      }
      const data = await response.json();
      return data;
    };
    try {
      const fetchedProducts = await fetchData();
      dispatch(productsActions.setProducts(fetchedProducts));
    } catch (error) {
      console.log(error);
    }
  };
};
