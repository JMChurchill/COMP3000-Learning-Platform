import React, { useState } from "react";

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
    e.preventDefault();
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
      } else {
        console.log(httpResponseCode);
        console.log("Could not create user");
      }
    } catch (e) {
      console.log("error occured: ", e);
    }
  };
  return (
    <div className="right-box">
      <h1>Sign up</h1>
      <form action="" onSubmit={signUp}>
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
        <label htmlFor="firstname">First name</label>
        <input
          type="firstname"
          name="firstname"
          onChange={(e) => setFirstname(e.target.value)}
        />
        <label htmlFor="lastname">Last name</label>
        <input
          type="lastname"
          name="lastname"
          onChange={(e) => setLastname(e.target.value)}
        />
        {isTeacher ? (
          <>
            <label htmlFor="phonenumber">Phone number</label>
            <input
              type="phonenumber"
              name="phonenumber"
              onChange={(e) => setPhonenumber(e.target.value)}
            />
          </>
        ) : (
          <></>
        )}
        <input type="submit" className="btn" value="Sign up" />
      </form>
    </div>
  );
};

export default SignUpBox;
