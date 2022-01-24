import React from "react";
import Task from "../Components/Task";
import TaskDetails from "../Components/TaskDetails";

const UserProfile = () => {
  return (
    <div className="content-box">
      <h1>User Profile</h1>
      <div className="container">
        <div className="left-box task-box">
          <Task />
          <Task />
          <Task />
          <Task />
          <Task />
          <Task />
          <Task />
          <Task />
        </div>
        <div className="right-box vFill">
          <TaskDetails />
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
