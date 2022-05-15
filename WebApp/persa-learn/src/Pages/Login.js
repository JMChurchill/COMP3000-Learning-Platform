import React, { useState } from "react";
import LoginBox from "../Components/Login/LoginBox";
import SignUpBox from "../Components/Login/SignUpBox";
import ToggleSwitch from "../Components/ToggleSwitch";
import userIcon from "../assets/tempUserIcon.svg";
import logo from "../assets/largeLogo.png";

import styles from "./Login.module.css";
import CustomButton from "../Components/CustomButton";

const Login = ({ setToken }) => {
  const [signUp, setSignUp] = useState(false);
  const [isTeacher, setIsTeacher] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  return (
    <div className="content-box" data-testid="login">
      {/* <h1>Login</h1> */}
      {/* <div className="container center-container"> */}
      {/* <div className="container"> */}
      <div className={styles.container}>
        <div className={styles.right_box}>
          <img src={logo} alt="User icon" />
          {isAdmin ? (
            <></>
          ) : (
            <ToggleSwitch
              name="toggleTeacher"
              checked={isTeacher}
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
      </div>
    </div>
  );
};

export default Login;
