import React, { useEffect, useState } from "react";
import {
  getStudentsInClass,
  removeStudentFromClass,
} from "../../http_Requests/teacherRequests";

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
    <div className="right-box vFill user-search">
      <div className="search-box">
        <button className="btn" onClick={() => flipIsShowStudents()}>
          Back to details
        </button>
        {/* <p>Search</p>
        <input type="text" onChange={(e) => setSearchTerm(e.target.value)} />
        <button className="btn" onClick={() => searchForStudents()}>
          Search
        </button> */}
      </div>
      <div className="column-names  in-class">
        <p>First name</p>
        <p>Last name</p>
      </div>
      <div className="search-results">
        {students.map((student, i) => (
          <div className="result in-class" key={i}>
            {/* <p>{student.Email}</p> */}
            <p>{student.FirstName}</p>
            <p>{student.LastName}</p>
            <button
              className="btn"
              onClick={() => removeStudent(student.StudentID)}
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListStudents;
