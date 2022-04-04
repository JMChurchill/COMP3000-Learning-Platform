import React, { useState } from "react";
import CustomButton from "./CustomButton";
import CustomInput from "./CustomInput";

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

        if (data !== null && data.status === "success") {
          setSignUp(false);
          alert("Account created successfully");
        } else {
          console.log(httpResponseCode);
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
    <div className="right-box">
      <h1>Sign up</h1>
      <label htmlFor="email">Email</label>
      <CustomInput name={email} setValue={setEmail} />
      <label htmlFor="email">Password</label>
      <CustomInput password={true} name={password} setValue={setPassword} />
      <label htmlFor="email">First name</label>
      <CustomInput name={firstname} setValue={setFirstname} />
      <label htmlFor="email">Last name</label>
      <CustomInput name={lastname} setValue={setLastname} />
      {isTeacher ? (
        <>
          <label htmlFor="phonenumber">Phone number</label>
          <CustomInput name={phonenumber} setValue={setPhonenumber} />
        </>
      ) : (
        <></>
      )}
      <CustomButton type={1} text={"Sign up"} onClick={() => signUp()} />
    </div>
  );
};

export default SignUpBox;
