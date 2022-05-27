import React, { useCallback, useState } from "react";
import formatCurrency from "../utils";
import Fade from "react-reveal/Fade";
import Modal from "react-modal";

const Products = (props) => {
  const [showModal, setShowModal] = useState(null);

  const modalHandler = (product) => {
    setShowModal(product);
  };

  const closeModal = () => {
    setShowModal(null);
  };

  const modalCloseHandler = () => {
     closeModal();
     props.addToCart(showModal);

  }

  return (
    <div>
      <Fade bottom cascade>
        <ul className="products">
          {props.products.map((product) => (
            <li key={product._id} {...props}>
              <div className="product">
                <a href={"#" + product._id}>
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
                    onClick={() => props.addToCart(product)}
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
                <p>
                  Available sizes:{" "}
                  {showModal.availableSizes.map((x) => (
                    <span>
                      {" "}
                      <button className="button">{x}</button>
                    </span>
                  ))}
                </p>
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
