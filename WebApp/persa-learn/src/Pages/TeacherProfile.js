import React, { useEffect, useState } from "react";
import ClassDetails from "./ClassDetails";
import Class from "../Components/Class";
import {
  getTeachersClasses,
  searchStudents,
} from "../http_Requests/teacherRequests";
import { useNavigate } from "react-router-dom";

const TeacherProfile = () => {
  const [classes, setClasses] = useState([]);
  // const [usersName, setUsersName] = useState();
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(async () => {
    let data = await getTeachersClasses();
    setClasses(data);
  }, []);

  const navigate = useNavigate();

  const searchForStudents = async () => {
    console.log(searchTerm);
    //get students
    let data = await searchStudents(searchTerm);
    //add to array
    setSearchResults(data);
    console.log(data);
  };

  const addStudent = async (studentID) => {};

  // useEffect(async () => {
  //   console.log(classes);
  // }, [classes]);

  return (
    <div className="content-box">
      <h1>Teacher Profile</h1>
      <div className="container">
        <div className="left-box task-box">
          {classes.map((c, i) => (
            <Class
              key={c.classdetailsID}
              id={c.classdetailsID}
              name={c.Name}
              yearGroup={c.YearGroup}
            />
          ))}
          <div className="bottom-bar">
            <button
              className="btn"
              // onClick={() => {
              //   navigate("");
              // }}
            >
              Add class
            </button>
          </div>
        </div>
        {/* <div className="right-box vFill">
          <ClassDetails />
        </div> */}
        <div className="right-box vFill user-search">
          <div className="search-box">
            <p>Search</p>
            <input
              type="text"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className="btn" onClick={() => searchForStudents()}>
              Search
            </button>
          </div>
          <div className="column-names">
            <p>Email</p>
            <p>First name</p>
            <p>Last name</p>
          </div>
          <div className="search-results">
            {searchResults.map((student, i) => (
              <div className="result" key={i}>
                {/* <p>{student.StudentID}</p> */}
                <p>{student.Email}</p>
                <p>{student.FirstName}</p>
                <p>{student.LastName}</p>
                <button
                  className="btn"
                  onClick={() => addStudent(student.StudentID)}
                >
                  Add
                </button>
              </div>
            ))}
            {/* <div className="result">studentName</div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherProfile;
