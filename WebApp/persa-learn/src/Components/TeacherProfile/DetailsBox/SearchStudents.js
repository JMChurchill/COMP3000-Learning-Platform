import React, { useState, useEffect } from "react";
import {
  addStudentToClass,
  allStudents,
  searchStudents,
} from "../../../http_Requests/teacherRequests";
import CustomButton from "../../CustomButton";
import CustomInput from "../../CustomInput";
import styles from "./SearchStudents.module.css";

const SearchStudents = ({ classID, setIsSearching, isSearching }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(async () => {
    // get all students from database
    const data = await allStudents();
    if (data.status === "success") {
      setSearchResults(data.students);
    }
  }, []);

  const addStudent = async (studentID) => {
    let details = { studentID, classID };
    // add student to the class
    let data = await addStudentToClass(details);
    // console.log(data);
    if (data.status === "success") console.log("student added to class");
    else if (data.reason === "ER_DUP_ENTRY")
      console.log("student already in class");
  };

  const searchForStudents = async () => {
    console.log(searchTerm);
    //get students
    let data = await searchStudents(searchTerm);
    //add to array
    console.log(data);
    if (data.status === "success") {
      setSearchResults(data.data);
    }
  };
  console.log(classID);

  return (
    // <div className="right-box vFill user-search">
    <>
      {/* <div className="search-box"> */}
      <div className={styles.search_box}>
        {/* <button className="btn" onClick={() => setIsSearching(!isSearching)}>
          Stop Searching
        </button> */}
        <CustomButton
          text={"X"}
          onClick={() => setIsSearching(!isSearching)}
          fill={true}
        />

        <p>Search</p>
        {/* <input type="text" onChange={(e) => setSearchTerm(e.target.value)} /> */}
        <CustomInput
          name={"search"}
          // onChange={(e) => setSearchTerm(e.target.value)}
          setValue={setSearchTerm}
          fill={true}
        />
        {/* <button className="btn" onClick={() => searchForStudents()}>
          Search
        </button> */}
        <CustomButton
          text={"Go"}
          onClick={() => searchForStudents()}
          fill={true}
        />
      </div>
      <div className={styles.column_names}>
        <p>Email</p>
        <p>First name</p>
        <p>Last name</p>
      </div>
      <div className={styles.search_results}>
        {searchResults.map((student, i) => (
          <div className={styles.result} key={i}>
            {/* <p>{student.StudentID}</p> */}
            <p>{student.Email}</p>
            <p>{student.FirstName}</p>
            <p>{student.LastName}</p>
            {/* <button
              className="btn"
              onClick={() => addStudent(student.StudentID)}
            >
              Add
            </button> */}
            <CustomButton
              text={"Add"}
              onClick={() => addStudent(student.StudentID)}
              fill={true}
            />
          </div>
        ))}
        {/* <div className="result">studentName</div> */}
      </div>
    </>
    // </div>
  );
};

export default SearchStudents;
