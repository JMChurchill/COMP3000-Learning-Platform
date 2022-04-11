import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import CustomButton from "../Components/CustomButton";
import CustomInput from "../Components/CustomInput";
import styles from "./EditUserSettings.module.css";

import { updateUserDetails } from "../http_Requests/studentRequests";

const EditUserSettings = () => {
  //get variables passed from user settings
  const { state } = useLocation();
  //TODO: allow to change profile picture
  const [email, setEmail] = useState(state.email);
  const [firstName, setFirstName] = useState(state.firstName);
  const [lastName, setLastName] = useState(state.lastName);
  const [isSuccess, setIsSuccess] = useState(false);
  //   const [password, setPassword] = useState();//TODO: make change password

  const updateUser = async (e) => {
    // e.preventDefault();
    const credentials = {
      email: email,
      firstname: firstName,
      lastname: lastName,
    };
    // send update request
    let data = await updateUserDetails(credentials);
    if (data.status === "success") {
      setIsSuccess(true);
    } else {
      setIsSuccess(false);
    }
    console.log("the data: ", data);
  };
  return (
    <div className="content-box">
      {/* <div className="container wide-container center-container"> */}
      <h1>User settings</h1>
      {/* <div className="container"> */}
      <div className={styles.container}>
        {isSuccess ? (
          <h2 className={styles.success_message}>Successfully changed</h2>
        ) : (
          ""
        )}
        <h2>Edit User Details</h2>
        {/* <div id="update-user-form"> */}
        <label htmlFor="email" className={styles.title}>
          Email
        </label>
        <CustomInput value={email} name={"email"} setValue={setEmail} />
        <label htmlFor="firstname" className={styles.title}>
          First name
        </label>
        <CustomInput
          value={firstName}
          name={"firstname"}
          setValue={setFirstName}
        />
        <label htmlFor="lastname" className={styles.title}>
          Last name
        </label>
        <CustomInput
          value={lastName}
          name={"lastname"}
          setValue={setLastName}
        />
        <CustomButton text={"Update user"} onClick={updateUser} />
        {/* </div> */}
      </div>
    </div>
    // </div>
  );
};

export default EditUserSettings;
