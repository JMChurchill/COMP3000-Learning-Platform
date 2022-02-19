import React, { useEffect, useState } from "react";
import { getStudentsInClass } from "../../http_Requests/teacherRequests";

const ListStudents = ({ classID, flipIsShowStudents }) => {
  const [students, setStudents] = useState([]);

  useEffect(async () => {
    // console.log({ classID });
    // console.log(JSON.stringify({ classID }));
    let details = { classID: classID };
    let data = await getStudentsInClass(details);
    console.log(data);
    setStudents(data);
  }, []);

  const removeStudent = (studentID) => {
    console.log("remove student: ", studentID);
  };
  return (
    <div className="right-box vFill user-search">
      <div className="search-box">
        <button className="btn" onClick={() => flipIsShowStudents()}>
          Stop Searching
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
