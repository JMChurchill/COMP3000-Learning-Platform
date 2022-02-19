import React, { useEffect, useState } from "react";

import { useLocation } from "react-router-dom";

import LeaderboardStudent from "../Components/LeaderboardStudent";

import tempUserIcon from "../assets/UserIcons/001-man-1.png";
import { getStudentsInClass } from "../http_Requests/userRequests";

const ClassLeaderboard = () => {
  const { state } = useLocation();
  const [students, setStudents] = useState([]);
  // console.log(state.classID);

  useEffect(async () => {
    // console.log(JSON.stringify(state));
    console.log(state);
    const data = await getStudentsInClass(state);
    console.log(data);
    setStudents(data);
  }, []);

  return (
    <div className="content-box">
      <h1>Class leaderboard</h1>
      <div className="container wide-container center-container">
        <div className="leaderboard-box">
          <div className="top-students">
            <div className="top-student">
              <div className="img-container">
                <img src={tempUserIcon} alt="user icon" height="100px" />
              </div>
              <p>2</p>
              <p>Student 1</p>
            </div>
            <div className="top-student">
              <div className="img-container">
                <img src={tempUserIcon} alt="user icon" height="100px" />
              </div>
              <p>1</p>
              <p>Student 1</p>
            </div>
            <div className="top-student">
              <div className="img-container">
                <img src={tempUserIcon} alt="user icon" height="100px" />
              </div>
              <p>3</p>
              <p>Student 1</p>
            </div>
          </div>
          {students.map((student, i) => (
            <LeaderboardStudent
              key={i}
              icon={tempUserIcon}
              name={`${student.FirstName} ${student.LastName}`}
              position={i}
            />
          ))}
          {/* <LeaderboardStudent icon={tempUserIcon} />
          <LeaderboardStudent icon={tempUserIcon} />
          <LeaderboardStudent icon={tempUserIcon} />
          <LeaderboardStudent icon={tempUserIcon} /> */}
        </div>
      </div>
    </div>
  );
};

export default ClassLeaderboard;
