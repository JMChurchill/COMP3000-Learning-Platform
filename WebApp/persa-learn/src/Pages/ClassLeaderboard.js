import React from "react";

import LeaderboardStudent from "../Components/LeaderboardStudent";

import tempUserIcon from "../assets/UserIcons/001-man-1.png";

const ClassLeaderboard = () => {
  return (
    <div className="content-box">
      <h1>Class leaderboard</h1>
      <div className="container wide-container center-container">
        <div className="leaderboard-box">
          <div className="top-students">
            <div className="top-student">
              <img src={tempUserIcon} alt="user icon" height="100px" />
              <p>Student 1</p>
              <p>Position</p>
            </div>
            <div className="top-student">
              <img src={tempUserIcon} alt="user icon" height="100px" />
              <p>Student 1</p>
              <p>Position</p>
            </div>
          </div>
          <LeaderboardStudent icon={tempUserIcon} />
          <LeaderboardStudent icon={tempUserIcon} />
          <LeaderboardStudent icon={tempUserIcon} />
          <LeaderboardStudent icon={tempUserIcon} />
          <p>Student 1</p>
          <p>Student 1</p>
          <p>Student 1</p>
          <p>Student 1</p>
        </div>
      </div>
    </div>
  );
};

export default ClassLeaderboard;
