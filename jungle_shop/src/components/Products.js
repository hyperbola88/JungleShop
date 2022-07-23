import React from "react";
import { useDispatch, useSelector } from "react-redux";

import formatCurrency from "../utils";
import Fade from "react-reveal/Fade";
import Modal from "react-modal";
import { cartActions } from "../store/cart-slice";
import { uiActions } from "../store/ui-slice";

const Products = (props) => {
  const dispatch = useDispatch();
  const showModal = useSelector(state => state.ui.modalVisible)

  const addToCartHandler = (product) => {
    dispatch(cartActions.addToCart(product));
  }

  const modalHandler = (product) => {
    dispatch(uiActions.showModal(product));

  };

  const closeModal = () => {
    dispatch(uiActions.closeModal());
  };

  const modalCloseHandler = () => {
    dispatch(cartActions.addToCart(showModal));
    dispatch(uiActions.closeModal());
  }

  return (
    <div>
      <Fade bottom cascade>
        <ul className="products">
          {props.products.map((product) => (
            <li key={product.id}>
              <div className="product">
                <a href={"#" + product.id}>
                  <img
                    onClick={() => modalHandler(product)}
                    src={product.image}
                    alt="product"
                  ></img>
                  <p>{product.title}</p>
                </a>
                <div className="product-price">
                  <div>{formatCurrency(product.price)}</div>
                  <button
                    className="button primary"
                    onClick={() => addToCartHandler(product)}
                  >
                    Add to cart
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </Fade>
      {showModal && (
        <Modal
          isOpen={showModal}
          onRequestClose={closeModal}
          ariaHideApp={false}
        >
          <Fade bottom>
            <button onClick={closeModal} className="close-modal">x</button>
            <div className="product-details">
              <img src={showModal.image} alt="plant" />
              <div className="product-details-description">
                <p>
                  <strong>{showModal.title}</strong>
                </p>
                <p>{showModal.description}</p>
                <div>
                  <div className="product-price">
                    {formatCurrency(showModal.price)}
                  </div>
                  <button className="button primary" onClick={modalCloseHandler}>Add to cart</button>
                </div>
              </div>
            </div>
          </Fade>
        </Modal>
      )}
    </div>
  );
};

export default Products;
