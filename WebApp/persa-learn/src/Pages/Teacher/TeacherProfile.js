import React, { useEffect, useState } from "react";
import ClassItem from "../../Components/TeacherProfile/ClassList/ClassItem";
import {
  getTeachersClasses,
  getTeachersDetails,
} from "../../http_Requests/teacherRequests";
import { useNavigate } from "react-router-dom";
import ClassDetails from "../../Components/TeacherProfile/DetailsBox/ClassDetails";
import AddClass from "../../Components/TeacherProfile/DetailsBox/AddClass";
import ClassList from "../../Components/TeacherProfile/ClassList/ClassList";

import styles from "./TeacherProfile.module.css";
import CustomButton from "../../Components/CustomButton";

const TeacherProfile = () => {
  const [firstName, setFirstName] = useState();

  const navigate = useNavigate();

  // const [usersName, setUsersName] = useState();
  const getDetails = async () => {
    const data = await getTeachersDetails();
    // console.log(data);
    if (data.status === "success") {
      // console.log(data.details);

      setFirstName(data.details.FirstName);
    }
  };

  useEffect(async () => {
    await getDetails();
  }, []);

  return (
    <div className="content-box">
      <h1>Teacher Profile (Classes)</h1>
      {/* <div className="container"> */}
      <div className={styles.container}>
        <h2>Welcome back {firstName} </h2>
        <CustomButton
          text={"My details"}
          onClick={() => navigate("/details_teacher", {})}
        />
      </div>
    </div>
  );
};

export default TeacherProfile;
