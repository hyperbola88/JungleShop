import React, { useState } from "react";

const Form = ({ cartItems, orderHandler }) => {
  const [emailInputInfo, setEmailInputInfo] = useState("");
  const [nameInputInfo, setNameInputInfo] = useState("");
  const [addressInputInfo, setAddressInputInfo] = useState("");

  const emailInputHandler = (event) => {
    setEmailInputInfo(event.target.value);
  };

  const nameInputHandler = (event) => {
    setNameInputInfo(event.target.value);
  };

  const addressInputHandler = (event) => {
    setAddressInputInfo(event.target.value);
  };

  const createOrder = (event) => {
    event.preventDefault();
    orderHandler({
      email: emailInputInfo,
      name: nameInputInfo,
      address: addressInputInfo,
      cartItems: cartItems,
    });
    setEmailInputInfo("");
    setNameInputInfo("");
    setAddressInputInfo("");
  };

  return (
    <div className="cart">
      <form onSubmit={createOrder}>
        <ul className="form-container">
          <li>
            <label>Email</label>
            <input
              value={emailInputInfo}
              name="email"
              type="email"
              onChange={emailInputHandler}
              required
            ></input>
          </li>
          <li>
            <label>Name</label>
            <input
              value={nameInputInfo}
              name="name"
              type="text"
              onChange={nameInputHandler}
              required
            ></input>
          </li>
          <li>
            <label>Address</label>
            <input
              value={addressInputInfo}
              name="address"
              type="text"
              onChange={addressInputHandler}
              required
            ></input>
          </li>
          <li>
            <button className="button primary">Submit</button>
          </li>
        </ul>
      </form>
    </div>
  );
};

export default Form;
