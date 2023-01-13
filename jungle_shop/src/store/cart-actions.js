import { cartActions } from "./cart-slice";
import { uiActions } from "./ui-slice";

export const fetchCartData = () => {
  return (dispatch) => {
    let data = localStorage.getItem("cart");
    if (data)  {
        data = JSON.parse(data);
    } else {
      data = {items: [], totalQuantity: 0,  totalAmount: 0, changed: false};
    };
    
    dispatch(
      cartActions.replaceCart({
        items: data.items,
        totalQuantity: data.totalQuantity,
        changed: false
      })
    )
  }
    

};

export const sendCartData = (data) => {
  return async () => {
    const sendRequest = async () => {
      const response = await fetch(
        "https://jungle-shop-2b49f-default-rtdb.europe-west1.firebasedatabase.app/cart.json",
        {
          method: "PUT",
          body: JSON.stringify(data),
        }
      );
      if (!response.ok) {
        throw new Error("something went wrong");
      }
    };

    try {
      await sendRequest();
    } catch (error) {
      console.log(error);
    }
  };
};
