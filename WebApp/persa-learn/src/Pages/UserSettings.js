import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import studentIcon from "../assets/UserIcons/001-man-1.png";

const UserSettings = () => {
  const [email, setEmail] = useState();
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();

  const navigate = useNavigate();
  //get user details from api on load
  useEffect(async () => {
    const token = JSON.parse(sessionStorage.getItem("token"));
    // token = JSON.parse(token);
    console.log(token);

    let data = await fetch("http://localhost:8080/student/details", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        autherization: token,
      },
    }).then((data) => data.json());

    console.log(data);

    const { FirstName, LastName, Email } = data[0];
    setEmail(Email);
    setFirstName(FirstName);
    setLastName(LastName);
  }, []);
  const deleteAccount = () => {
    //TODO: Make delete user
    if (
      window.confirm(
        "Are you sure you want to save this thing into the database?"
      )
    ) {
      // Save it!
      console.log("Thing was saved to the database.");
    } else {
      // Do nothing!
      console.log("Thing was not saved to the database.");
    }
  };
  return (
    <div className="content-box">
      <div className="container wide-container center-container">
        <h1>User settings</h1>
        <div className="container wide-container center-container">
          <h2>Profile picture</h2>
          <img src={studentIcon} alt="user icon" height="100px" />
          <h2>My details</h2>
          <p>Email:{email}</p>
          <p>First: {firstName}</p>
          <p>Last: {lastName}</p>

          <button
            className="btn"
            onClick={() =>
              navigate("/user_settings/edit", {
                state: {
                  firstName: firstName,
                  lastName: lastName,
                  email: email,
                },
              })
            }
          >
            Update details
          </button>
          <button className="btn" onClick={deleteAccount}>
            delete my account
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserSettings;