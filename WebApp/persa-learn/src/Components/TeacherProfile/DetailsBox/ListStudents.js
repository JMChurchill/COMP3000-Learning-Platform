import React, { useEffect, useState } from "react";
import {
  getStudentsInClass,
  removeStudentFromClass,
} from "../../../http_Requests/teacherRequests";
import CustomButton from "../../CustomButton";
import styles from "./ListStudents.module.css";

const ListStudents = ({ classID, flipIsShowStudents }) => {
  const [students, setStudents] = useState([]);
  //   const [searchResults, setSearchResults] = useState([]);
  const [isDeleted, setIsDeleted] = useState(false);

  useEffect(async () => {
    let details = { classID: classID };
    let data = await getStudentsInClass(details);
    console.log(data);
    if (data.status === "success") setStudents(data.data);
  }, [isDeleted]);

  const removeStudent = async (studentID) => {
    let data = await removeStudentFromClass({ studentID, classID });
    if (data.status === "success") {
      console.log("successfully deleted user");
      setIsDeleted(!isDeleted);
    }
  };
  return (
    // <div className="right-box vFill user-search">
    <>
      <div className={styles.search_box}>
        {/* <button className="btn" onClick={() => flipIsShowStudents()}>
          Back to details
        </button> */}
        <CustomButton
          text={"X"}
          fill={true}
          onClick={() => flipIsShowStudents()}
        />
      </div>
      <div className={styles.column_names}>
        <p>First name</p>
        <p>Last name</p>
      </div>
      <div className={styles.students}>
        {students.map((student, i) => (
          <div className={styles.student} key={i}>
            {/* <p>{student.Email}</p> */}
            <p>{student.FirstName}</p>
            <p>{student.LastName}</p>
            <div></div>
            {/* <button
              className="btn"
              onClick={() => removeStudent(student.StudentID)}
            >
              Remove
            </button> */}
            <CustomButton
              text={"Remove"}
              onClick={() => removeStudent(student.StudentID)}
            />
          </div>
        ))}
      </div>
    </>
    // </div>
  );
};

export default ListStudents;
