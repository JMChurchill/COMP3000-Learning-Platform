import React, { useState } from "react";
import LoginBox from "../Components/Login/LoginBox";
import SignUpBox from "../Components/Login/SignUpBox";
import ToggleSwitch from "../Components/ToggleSwitch";
import userIcon from "../assets/tempUserIcon.svg";

import styles from "./Login.module.css";
import CustomButton from "../Components/CustomButton";

const Login = ({ setToken }) => {
  const [signUp, setSignUp] = useState(false);
  const [isTeacher, setIsTeacher] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  return (
    <div className="content-box">
      <h1>Login</h1>
      {/* <div className="container center-container"> */}
      {/* <div className="container"> */}
      <div className={styles.container}>
        {/* <div className="left-box"> */}
        {/* <div className={styles.left_box}>
          <h1>Not a member?</h1>
          <button className="btn" onClick={() => setSignUp(!signUp)}>
            Sign up
          </button>
        </div> */}
        <div className={styles.right_box}>
          <img src={userIcon} alt="User icon" />
          {isAdmin ? (
            <></>
          ) : (
            <ToggleSwitch
              name="aa"
              onChange={setIsTeacher}
              yes="teacher"
              no="student"
            />
          )}

          {!signUp ? (
            <>
              <LoginBox
                setToken={setToken}
                isAdmin={isAdmin}
                isTeacher={isTeacher}
                signUp={() => setSignUp(!signUp)}
              />
              {isAdmin ? (
                <CustomButton
                  text={"Back"}
                  type={2}
                  onClick={() => setIsAdmin(false)}
                />
              ) : (
                <CustomButton
                  text={"Admin Login"}
                  type={2}
                  onClick={() => setIsAdmin(true)}
                />
              )}
            </>
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
