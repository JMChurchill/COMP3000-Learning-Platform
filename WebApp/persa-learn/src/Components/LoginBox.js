import React, { useState } from "react";
import PropTypes from "prop-types";

import userIcon from "../assets/tempUserIcon.svg";

const loginUser = async (credentials) => {
  return (
    fetch("http://localhost:8080/student/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    })
      // .then((response) => {
      //   console.log(response.status);
      // })
      .then((data) => data.json())
  );
};

const LoginBox = ({ setToken }) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const login = async (e) => {
    e.preventDefault();
    const data = await loginUser({
      email,
      password,
    });
    // console.log(response.status);
    // console.log(data);
    const token = data.token;
    // console.log(token);
    if (!token) {
      console.log("wrong password");
      return;
    }
    setToken(token);
  };

  return (
    <div className="right-box">
      <img src={userIcon} alt="User icon" />
      <h1>Login</h1>
      <form action="" onSubmit={login}>
        <label htmlFor="email">Email</label>
        <input
          type="text"
          name="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <input type="submit" className="btn" />
      </form>
    </div>
  );
};

LoginBox.propTypes = {
  setToken: PropTypes.func.isRequired,
};

export default LoginBox;
