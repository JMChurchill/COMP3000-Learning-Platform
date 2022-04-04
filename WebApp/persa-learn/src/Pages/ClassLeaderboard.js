import React, { useEffect, useState } from "react";

import { useLocation } from "react-router-dom";

import LeaderboardStudent from "../Components/LeaderBoard/LeaderboardStudent";

import tempUserIcon from "../assets/UserIcons/001-man-1.png";
import { getStudentsInClass } from "../http_Requests/userRequests";
import TopStudent from "../Components/LeaderBoard/TopStudent";

const ClassLeaderboard = () => {
  const { state } = useLocation();
  const [students, setStudents] = useState([]);
  const [topThree, setTopThree] = useState([]);
  // console.log(state.classID);

  useEffect(async () => {
    const data = await getStudentsInClass(state);
    console.log(data);
    if (data.status === "success") setStudents(data.data);
  }, []);

  useEffect(async () => {
    getTopThree();
  }, [students]);

  const getTopThree = () => {
    if (students.length > 0) {
      // get first 3 values from array
      const tempArray = students.slice(0, 3);
      // switch order to be displayed later
      const tempVal = tempArray[0];
      tempArray[0] = tempArray[1];
      tempArray[1] = tempVal;
      setTopThree(tempArray);
    }
  };
  return (
    <div className="content-box">
      <h1>Class leaderboard</h1>
      <div className="container wide-container center-container">
        <div className="leaderboard-box">
          <div className="top-students">
            {topThree.map((student, i) => {
              let pos = i + 1;
              //adjust position for order of array (to display fist place in center)
              if (pos == 1) pos = 2;
              else if (pos == 2) pos = 1;
              if (i < 3) {
                return (
                  <TopStudent
                    key={i}
                    icon={tempUserIcon}
                    name={`${student.FirstName} ${student.LastName}`}
                    position={pos}
                    xp={student.Xp}
                  />
                );
              }
            })}
          </div>

          {students.map((student, i) => {
            if (i > 3) {
              return (
                <LeaderboardStudent
                  key={i}
                  icon={tempUserIcon}
                  name={`${student.FirstName} ${student.LastName}`}
                  position={i}
                  xp={student.Xp}
                />
              );
            }
          })}
        </div>
      </div>
    </div>
  );
};

export default ClassLeaderboard;
