import React, { useState } from "react";
import PropTypes from "prop-types";
import { loginUser } from "../http_Requests/userRequests";

import userIcon from "../assets/tempUserIcon.svg";
import CustomButton from "./CustomButton";
import CustomInput from "./CustomInput";

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

  const login = async () => {
    // e.preventDefault();
    try {
      if (email != null && password != null) {
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
      } else {
        alert("enter user name and password");
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
      {/* <form action="" onSubmit={login}> */}
      {/* <input
        type="text"
        name="email"
        onChange={(e) => setEmail(e.target.value)}
      /> */}
      {/* <input
        type="password"
        name="password"
        onChange={(e) => setPassword(e.target.value)}
      /> */}
      {/* <input type="submit" className="btn" value="login" /> */}
      {/* </form> */}
      <label htmlFor="email">Email</label>
      <CustomInput name={email} setValue={setEmail} />
      <label htmlFor="password">Password</label>
      <CustomInput password={true} name={password} setValue={setPassword} />
      {/* <button className="btn" onClick={logout}>
        Temp logout btn
      </button> */}
      <CustomButton type={1} text={"Login"} onClick={() => login()} />
      <CustomButton
        type={2}
        text={"temp logout btn"}
        onClick={() => logout()}
      />
    </div>
  );
};

LoginBox.propTypes = {
  setToken: PropTypes.func.isRequired,
};

export default LoginBox;
