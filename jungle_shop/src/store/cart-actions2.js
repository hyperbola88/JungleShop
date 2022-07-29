import { cartActions } from "./cart-slice";

export const fetchCartData = () => {
  return (dispatch) => {
    let data = localStorage.getItem("cart") ? localStorage.getItem("cart") : [];
    data = JSON.parse(data);

    dispatch(
      cartActions.replaceCart({
        items: data.items || [],
        totalQuantity: data.totalQuantity,
        changed: false
      })
    );
  };
};
