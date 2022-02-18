import React, { useEffect, useState } from "react";
import ClassDetails from "./ClassDetails";
import Class from "../Components/Class";
import { getTeachersClasses } from "../http_Requests/teacherRequests";
import { useNavigate } from "react-router-dom";

const TeacherProfile = () => {
  const [classes, setClasses] = useState([]);
  const [usersName, setUsersName] = useState();

  useEffect(async () => {
    let data = await getTeachersClasses();
    setClasses(data);
  }, []);

  const navigate = useNavigate();

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
        <div className="right-box vFill">
          <ClassDetails />
        </div>
      </div>
    </div>
  );
};

export default TeacherProfile;
