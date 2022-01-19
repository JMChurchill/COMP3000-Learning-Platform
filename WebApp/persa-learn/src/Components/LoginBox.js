import React from "react";

import userIcon from "../assets/tempUserIcon.svg";

const LoginBox = () => {
  const login = (e) => {
    e.preventDefault();
    console.log("Logged in");
  };
  return (
    <div className="right-box">
      <img src={userIcon} alt="User icon" />
      <h1>Login</h1>
      <form action="" onSubmit={login}>
        <label htmlFor="usermame">User name</label>
        <input type="text" name="username" />{" "}
        <label htmlFor="password">Password</label>
        <input type="password" name="password" />
        <input type="submit" className="btn" />
      </form>
    </div>
  );
};

export default LoginBox;
