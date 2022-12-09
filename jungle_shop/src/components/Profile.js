import { React, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { uiActions } from "../store/ui-slice";
import Fade from "react-reveal/Fade";

const Profile = () => {
  const passwordRef = useRef();

  const dispatch = useDispatch();
  const ui = useSelector(state => state.ui);

  const submitHandler = (event) => {
   event.preventDefault();
   const enteredNewPassword = passwordRef.current.value;
   fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyBg9hShhKcYDVNV_FpDEOOR2ivAO3prI4o",
      {
        method: "POST",
        body: JSON.stringify({
          idToken: ui.token,
          password: enteredNewPassword,
          returnSecureToken: true,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then(res => {
      dispatch(uiActions.toggleProfile(false));
    })
    .catch(error => {
      console.log(error);
    })
  };

   
  return (
    <div className="profile">
      <Fade top cascade>
      <h1>Your User Profile</h1>
      <form className="profile-form" onSubmit={submitHandler}>
        <div className="profile-password">
         
          <input
            type="password"
            id="new-password"
            minLength="6"
            ref={passwordRef}
            
          />
          <label htmlFor="new-password">Enter New Password</label>
        </div>
        <div className="profile-action">
          <button className="button">Change Password</button>
        </div>
      </form>
      </Fade>
    </div>
  );
};



export default Profile;
