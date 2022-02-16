import React, { useState } from "react";
import LoginBox from "../Components/LoginBox";
import SignUpBox from "../Components/SignUpBox";
import ToggleSwitch from "../Components/ToggleSwitch";

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
        <div className="left-box">
          <h1>Not a member?</h1>
          <button className="btn" onClick={() => setSignUp(!signUp)}>
            Sign up
          </button>
          <ToggleSwitch
            name="aa"
            onChange={setIsTeacher}
            yes="teacher"
            no="student"
          />
        </div>
        {!signUp ? (
          <LoginBox setToken={setToken} />
        ) : (
          <SignUpBox setSignUp={setSignUp} />
        )}
        {/* <LoginBox setToken={setToken} /> */}
      </div>
    </div>
  );
};

export default Login;
