import React, { useState } from "react";
import PropTypes from "prop-types";
import { loginUser } from "../../http_Requests/userRequests";

import userIcon from "../../assets/tempUserIcon.svg";
import CustomButton from "../CustomButton";
import CustomInput from "../CustomInput";

import styles from "./LoginBox.module.css";

const LoginBox = ({ setToken, isTeacher, isAdmin, signUp }) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [isError, setIsError] = useState(false);
  const [reason, setReason] = useState("");
  // const [httpResponseCode, setHttpResponseCode] = useState();

  const login = async () => {
    try {
      if (email != null && password != null) {
        const data = await loginUser(
          {
            email,
            password,
          },
          isTeacher,
          isAdmin
        );
        console.log("data: ", data);
        if (data !== null && data !== undefined) {
          const token = data.token;
          console.log(token);
          if (!token) {
            setIsError(true);
            if (data.reason === "ENOTFOUND" || data.reason === "ECONNREFUSED") {
              setReason("could not connect to db");
              return;
            }
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
    <>
      {!isAdmin ? <h1>Login</h1> : <h1>Admin Login</h1>}

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

      {isAdmin ? (
        <></>
      ) : (
        <CustomButton type={2} text={"Sign Up"} onClick={signUp} />
      )}
    </>
  );
};

LoginBox.propTypes = {
  setToken: PropTypes.func.isRequired,
};

export default LoginBox;
