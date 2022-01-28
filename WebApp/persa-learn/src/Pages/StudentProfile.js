import React from "react";

import studentIcon from "../assets/UserIcons/001-man-1.png";

const StudentProfile = () => {
  return (
    <div className="content-box">
      <div className="container wide-container center-container">
        <h1>Student profile</h1>
        <div className="container wide-container center-container">
          <div className="banner">
            <div className="upper">
              <div className="user-icon">
                <img src={studentIcon} alt="user icon" height="100px" />
                <div className="xp">
                  <p>100xp</p>
                </div>
              </div>
              <div className="name-box">
                <p>Name</p>
              </div>
            </div>
            <div className="progressbar">
              <div className="bar-fill"></div>
            </div>
          </div>
          <div className="content">
            <div className="tabs">
              <h3>Assignments</h3>
              <h3>Achievements</h3>
              <h3>Classmates</h3>
            </div>
            <p>item</p>
            <p>item</p>
            <p>item</p>
            <p>item</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;
