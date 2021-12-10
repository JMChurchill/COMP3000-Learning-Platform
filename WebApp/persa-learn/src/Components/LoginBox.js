import React from "react";

import userIcon from "../assets/tempUserIcon.svg";

const LoginBox = () => {
  return (
    <div className="right-box">
      <img src={userIcon} alt="User icon" />
      <h1>Login</h1>
      <form action="">
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
