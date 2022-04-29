import React, { useState } from "react";
import CustomButton from "../CustomButton";
import CustomInput from "../CustomInput";

import styles from "./SignUpBox.module.css";

const SignUpBox = ({ setSignUp, isTeacher }) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [firstname, setFirstname] = useState();
  const [lastname, setLastname] = useState();
  const [phonenumber, setPhonenumber] = useState();

  const [error, setError] = useState();
  const [httpResponseCode, setHttpResponseCode] = useState();

  const signUpUser = (credentials) => {
    let url;
    if (isTeacher) {
      url = "http://localhost:8080/teacher/create";
    } else {
      url = "http://localhost:8080/student/create";
    }
    return fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    }).then(
      (data) => data.json(),
      (errorData) => {
        setError(errorData);
      },
      (response) => {
        setHttpResponseCode(response.status);
      }
    );
  };

  const signUp = async (e) => {
    // e.preventDefault();
    if (
      email != null &&
      (password != null) & (firstname != null) & (lastname != null)
    ) {
      try {
        let data;
        if (!isTeacher) {
          data = await signUpUser({
            email,
            password,
            firstname,
            lastname,
          });
        } else {
          data = await signUpUser({
            email,
            password,
            firstname,
            lastname,
            phonenumber,
          });
        }
        //   console.log(error);
        //   console.log(data);
        // console.log(data.reason:);
        if (data !== null && data.status === "success") {
          setSignUp(false);
          alert("Account created successfully");
        } else if (data.status == "failure") {
          if (data.reason === "ER_DUP_ENTRY") {
            alert("This user already exists");
          }
        } else {
          alert("Could not create user");
        }
      } catch (e) {
        console.log("error occured: ", e);
      }
    } else {
      alert("Fill out all values");
    }
  };
  return (
    // <div className="right-box">
    <>
      <h1>Sign up</h1>
      <label htmlFor="email" className={styles.title}>
        Email
      </label>
      <CustomInput name={email} setValue={setEmail} />
      <label htmlFor="password" className={styles.title}>
        Password
      </label>
      <CustomInput password={true} name={password} setValue={setPassword} />
      <label htmlFor="firstname" className={styles.title}>
        First name
      </label>
      <CustomInput name={firstname} setValue={setFirstname} />
      <label htmlFor="lastname" className={styles.title}>
        Last name
      </label>
      <CustomInput name={lastname} setValue={setLastname} />
      {isTeacher ? (
        <>
          <label htmlFor="phonenumber" className={styles.title}>
            Phone number
          </label>
          <CustomInput name={phonenumber} setValue={setPhonenumber} />
        </>
      ) : (
        <></>
      )}
      <CustomButton type={1} text={"Sign up"} onClick={() => signUp()} />
      <CustomButton type={2} text={"Login"} onClick={() => setSignUp(false)} />
    </>
  );
};

export default SignUpBox;
