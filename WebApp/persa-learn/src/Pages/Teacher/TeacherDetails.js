import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CustomButton from "../../Components/CustomButton";
import OverlayConfirm from "../../Components/OverlayConfirm";
import {
  deleteTeacher,
  getTeachersDetails,
} from "../../http_Requests/teacherRequests";
import OverlayPassword from "./OverlayPassword";
import styles from "./TeacherDetails.module.css";

const TeacherDetails = () => {
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [email, setEmail] = useState();
  const [phoneNumber, setPhoneNumber] = useState();

  const [isDeleting, setIsDeleting] = useState();
  const [isChangePass, setIsChangePass] = useState();

  const navigate = useNavigate();

  const deleteUser = async () => {
    const data = await deleteTeacher();
    console.log(data);
    if (data.status === "success") {
      navigate("/", {});
      sessionStorage.clear();
      window.location.reload();
    }
  };

  const getDetails = async () => {
    const data = await getTeachersDetails();
    if (data.status === "success") {
      setFirstName(data.details.FirstName);
      setLastName(data.details.LastName);
      setEmail(data.details.email);
      setPhoneNumber(data.details.PhoneNumber);
    }
  };
  useEffect(async () => {
    await getDetails();
  }, []);
  return (
    <div className="content-box">
      <h1>Teacher Details</h1>
      <div className={styles.container}>
        <h2>Email</h2>
        <p>{email}</p>
        <h2>First name</h2>
        <p>{firstName}</p>
        <h2>Last name</h2>
        <p>{lastName}</p>
        <h2>Phone number</h2>
        <p>{phoneNumber}</p>

        <CustomButton
          text={"Edit details"}
          onClick={() => navigate("/edit_teacher", {})}
        />
        <CustomButton
          text={"Change Password"}
          onClick={() => setIsChangePass(true)}
        />
        <CustomButton
          text={"Delete Account"}
          type={2}
          onClick={() => setIsDeleting(true)}
        />
      </div>
      {isDeleting ? (
        <OverlayConfirm
          message={`Are you sure you want to delete your account (${email})?`}
          yes={() => {
            deleteUser();
          }}
          no={() => setIsDeleting(false)}
        />
      ) : (
        <></>
      )}
      {isChangePass ? (
        <OverlayPassword close={() => setIsChangePass(false)} />
      ) : (
        <></>
      )}
    </div>
  );
};

export default TeacherDetails;
