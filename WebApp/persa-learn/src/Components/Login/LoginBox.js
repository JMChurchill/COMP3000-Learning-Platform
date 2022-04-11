import React, { useState } from "react";
import PropTypes from "prop-types";
import { loginUser } from "../../http_Requests/userRequests";

import userIcon from "../../assets/tempUserIcon.svg";
import CustomButton from "../CustomButton";
import CustomInput from "../CustomInput";

import styles from "./LoginBox.module.css";

const LoginBox = ({ setToken, isTeacher, signUp }) => {
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
    // <div className="right-box">
    <>
      {/* <img src={userIcon} alt="User icon" /> */}
      <h1>Login</h1>
      {isError ? <p className={styles.error_message}>{reason}</p> : ""}

      <label htmlFor="email" className={styles.title}>
        Email
      </label>
      <CustomInput name={email} setValue={setEmail} />
      <label htmlFor="password" className={styles.title}>
        Password
      </label>
      <CustomInput password={true} name={password} setValue={setPassword} />
      <CustomButton type={1} text={"Login"} onClick={() => login()} />
      {/* <CustomButton
        type={2}
        text={"temp logout btn"}
        onClick={() => logout()}
      /> */}
      <CustomButton type={2} text={"Sign Up"} onClick={signUp} />
    </>
    // </div>
  );
};

LoginBox.propTypes = {
  setToken: PropTypes.func.isRequired,
};

export default LoginBox;
