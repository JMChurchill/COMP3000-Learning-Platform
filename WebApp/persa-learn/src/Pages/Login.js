import React from "react";
import LoginBox from "../Components/LoginBox";

const Login = ({ setToken }) => {
  return (
    <div className="content-box">
      <h1>Login</h1>
      <div className="container center-container">
        <LoginBox setToken={setToken} />
      </div>
    </div>
  );
};

export default Login;
