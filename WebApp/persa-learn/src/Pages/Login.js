import React, { useState } from "react";
import LoginBox from "../Components/Login/LoginBox";
import SignUpBox from "../Components/Login/SignUpBox";
import ToggleSwitch from "../Components/ToggleSwitch";
import userIcon from "../assets/tempUserIcon.svg";

import styles from "./Login.module.css";

const Login = ({ setToken }) => {
  const [signUp, setSignUp] = useState(false);
  const [isTeacher, setIsTeacher] = useState(false);
  if (isTeacher) {
    console.log("youre a teacher");
  } else {
    console.log("your a student");
  }
  return (
    <div className="content-box">
      <h1>Login</h1>
      {/* <div className="container center-container"> */}
      <div className="container">
        {/* <div className="left-box"> */}
        <div className={styles.left_box}>
          <h1>Not a member?</h1>
          <button className="btn" onClick={() => setSignUp(!signUp)}>
            Sign up
          </button>
        </div>
        <div className={styles.right_box}>
          <img src={userIcon} alt="User icon" />
          <ToggleSwitch
            name="aa"
            onChange={setIsTeacher}
            yes="teacher"
            no="student"
          />

          {!signUp ? (
            <LoginBox
              setToken={setToken}
              isTeacher={isTeacher}
              signUp={() => setSignUp(!signUp)}
            />
          ) : (
            <SignUpBox
              setSignUp={setSignUp}
              isTeacher={isTeacher}
              toggleSignUp={() => setSignUp(!signUp)}
            />
          )}
          {/* <ToggleSwitch
            name="aa"
            onChange={setIsTeacher}
            yes="teacher"
            no="student"
          /> */}
        </div>
        {/* <LoginBox setToken={setToken} /> */}
      </div>
    </div>
  );
};

export default Login;
