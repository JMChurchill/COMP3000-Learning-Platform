import React from "react";
import ClassDetails from "./ClassDetails";
import Class from "../Components/Class";

const TeacherProfile = () => {
  return (
    <div className="content-box">
      <h1>User Profile</h1>
      <div className="container">
        <div className="left-box task-box">
          <Class />
          <Class />
          <Class />
          <div className="bottom-bar">
            <button className="btn">Add class</button>
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
