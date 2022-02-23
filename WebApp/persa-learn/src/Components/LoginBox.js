import React, { useState } from "react";
import PropTypes from "prop-types";
import { loginUser } from "../http_Requests/userRequests";

import userIcon from "../assets/tempUserIcon.svg";

const LoginBox = ({ setToken, isTeacher }) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [isError, setIsError] = useState(false);
  const [reason, setReason] = useState("");
  // const [httpResponseCode, setHttpResponseCode] = useState();

  const logout = () => {
    sessionStorage.clear();
    window.location.reload();
    // setToken("");
  };

  const login = async (e) => {
    e.preventDefault();
    try {
      const data = await loginUser(
        {
          email,
          password,
        },
        isTeacher
      );
      // console.log(error);
      console.log("data: ", data);
      // console.log(response.status);
      // console.log(data);
      if (data !== null && data !== undefined) {
        const token = data.token;
        console.log(token);
        if (!token) {
          setIsError(true);
          if (data.reason === "ENOTFOUND" || data.reason === "ECONNREFUSED") {
            // console.log("could not connect to db");
            setReason("could not connect to db");
            return;
          }
          // console.log("Email or Password incorrect");
          setReason("Email or Password incorrect");
          return;
        }
        if (isTeacher) {
          sessionStorage.setItem("teacher", true);
        } else {
          sessionStorage.setItem("teacher", false);
        }
        setIsError(false);
        setToken(token);
      } else {
        // console.log(httpResponseCode);
        console.log("No data returned");
      }
    } catch (e) {
      console.log("error occured: ", e);
    }
  };

  return (
    <div className="right-box">
      <img src={userIcon} alt="User icon" />
      <h1>Login</h1>
      {isError ? <p className="error-message">{reason}</p> : ""}
      {/* <p>An error occured</p> */}
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
        <input type="submit" className="btn" value="login" />
      </form>
      <button className="btn" onClick={logout}>
        Temp logout btn
      </button>
    </div>
  );
};

LoginBox.propTypes = {
  setToken: PropTypes.func.isRequired,
};

export default LoginBox;
