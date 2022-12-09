import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Fade } from "react-reveal";
import Modal from "react-modal";
import { uiActions } from "../store/ui-slice";

const LogInModal = () => {
  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const dispatch = useDispatch();
  const ui = useSelector((state) => state.ui);

  const switchAuthModeHandler = () => {
    dispatch(uiActions.toggleSignUp(!ui.signUpOpen));
  };

  const closeModalHandler = () => {
    dispatch(uiActions.toggleLogIn(false));
    dispatch(uiActions.toggleSignUp(false));
  };

  const getRemaningTime = (data) => {
    const expirationTime = new Date(
      new Date().getTime() + +data.expiresIn * 100
    );
    const currentTime = new Date().getTime();
    const receivedRemaningTime = expirationTime - currentTime;
    console.log("recievedRemainingTime " + receivedRemaningTime);
    return receivedRemaningTime;
  };

  const submitHandler = (event) => {
    event.preventDefault();
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    //some validation??
    dispatch(uiActions.toggleIsLoading(true));
    let url;
    if (!ui.signUpOpen) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBg9hShhKcYDVNV_FpDEOOR2ivAO3prI4o";
    } else {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBg9hShhKcYDVNV_FpDEOOR2ivAO3prI4o";
    }
    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        email: enteredEmail,
        password: enteredPassword,
        returnSecureToken: true,
      }),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
        dispatch(uiActions.toggleIsLoading(false));
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            let errorMessage = "Authentification failed!";
            if (data && data.error && data.error.message) {
              errorMessage = data.error.message;
            }
            throw new Error(errorMessage);
          });
        }
      })
      .then((data) => {
        const time = getRemaningTime(data);
        dispatch(uiActions.setRemaningTime(time));
        dispatch(uiActions.loginHandler(data.idToken));
        dispatch(uiActions.toggleLogIn(false));
        return time;
      })
      .then((time) => {
        console.log(ui.remaningTime, time);
        setTimeout(() => {
          dispatch(uiActions.logoutHandler());
        }, time);
      })
      .catch((err) => {
        alert(err.mesage);
      });
  };

  return (
    <Modal
      isOpen={ui.logInOpen}
      onRequestClose={closeModalHandler}
      ariaHideApp={false}
      className="login"
    >
      <Fade bottom>
        <div className="login-box">
          <button onClick={closeModalHandler} className="close-modal">
            x
          </button>
          <h1 className="login-h1">
            {ui.signUpOpen ? "Sign Up!" : "Enter your login and password"}
          </h1>
          <form className="login-form" onSubmit={submitHandler}>
            <div className="login-input">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" ref={emailInputRef} required />
            </div>
            <div className="login-input">
              <label htmlFor="password"> Password</label>
              <input
                type="password"
                id="password"
                ref={passwordInputRef}
                required
              />
            </div>
            <div className="login-action">
              {!ui.isLoading && (
                <button className="button primary">
                  {!ui.signUpOpen ? "Login" : "Create Account"}
                </button>
              )}
              {ui.isLoading && <p>Loading...</p>}
              <button
                type="button"
                className="button primary"
                onClick={switchAuthModeHandler}
              >
                {!ui.signUpOpen
                  ? "Create new account"
                  : "Login with existing account"}
              </button>
            </div>
          </form>
        </div>
      </Fade>
    </Modal>
  );
};

export default LogInModal;
