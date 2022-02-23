import React, { useState } from "react";
import {
  addStudentToClass,
  searchStudents,
} from "../../http_Requests/teacherRequests";

const SearchStudents = ({ classID, setIsSearching, isSearching }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

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
    <div className="right-box vFill user-search">
      <div className="search-box">
        <button className="btn" onClick={() => setIsSearching(!isSearching)}>
          Stop Searching
        </button>
        <p>Search</p>
        <input type="text" onChange={(e) => setSearchTerm(e.target.value)} />
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
  );
};

export default SearchStudents;
