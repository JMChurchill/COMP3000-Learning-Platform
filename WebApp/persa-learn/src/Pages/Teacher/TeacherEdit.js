import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CustomButton from "../../Components/CustomButton";
import CustomInput from "../../Components/CustomInput";
import {
  editTeachers,
  getTeachersDetails,
} from "../../http_Requests/teacherRequests";
import styles from "./TeacherDetails.module.css";
const TeacherEdit = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const navigate = useNavigate();

  const getDetails = async () => {
    const data = await getTeachersDetails();
    console.log(data);
    if (data.status === "success") {
      setFirstName(data.details.FirstName);
      setLastName(data.details.LastName);
      setEmail(data.details.email);
      setPhoneNumber(data.details.PhoneNumber);
    } else alert("An error occured, unable to edit details");
  };

  const saveChanges = async () => {
    const data = await editTeachers({
      email,
      firstname: firstName,
      lastname: lastName,
      phonenumber: phoneNumber,
    });
    console.log(data);
    if (data.status === "success") {
      navigate("/details_teacher", {});
    }
  };
  useEffect(async () => {
    await getDetails();
  }, []);
  return (
    <div className="content-box">
      <h1>Teacher Edit</h1>
      <div className={styles.container}>
        <h2>Email</h2>
        <CustomInput placeholder={"Email"} setValue={setEmail} value={email} />
        <h2>First name</h2>
        <CustomInput
          placeholder={"First name"}
          setValue={setFirstName}
          value={firstName}
        />
        <h2>Last name</h2>
        <CustomInput
          placeholder={"Last name"}
          setValue={setLastName}
          value={lastName}
        />
        <h2>Phone number</h2>
        <CustomInput
          placeholder={"Phone number"}
          setValue={setPhoneNumber}
          value={phoneNumber}
        />
        <CustomButton text={"Save Changes"} onClick={saveChanges} />
      </div>
    </div>
  );
};

export default TeacherEdit;
