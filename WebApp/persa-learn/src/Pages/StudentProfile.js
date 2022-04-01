import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Redirect,
  Link,
} from "react-router-dom";

import { FaCog } from "react-icons/fa";

import studentIcon from "../assets/UserIcons/001-man-1.png";
import {
  getStudentsAssignmentQuizzes,
  getStudentsClassses,
  getUserDetails,
} from "../http_Requests/userRequests";
import ClassItem from "../Components/ClassItem";
import AssignmentItem from "../Components/AssignmentItem";
import {
  getStudentCoins,
  getStudentXp,
} from "../http_Requests/studentRequests";
// import Achievements from "./Achievements";

const StudentProfile = () => {
  const [classes, setClasses] = useState([]);
  const [assignments, setAssignments] = useState([]);

  const [usersName, setUsersName] = useState("");
  const [selectedTab, setSelectedTab] = useState(1);

  const [xp, setXp] = useState(0);
  const [coins, setCoins] = useState(0);

  const tabs = ["Classes", "Achievements", "Assignments"];
  useEffect(async () => {
    //get students xp
    let data = await getStudentXp();
    setXp(data.data[0].Xp);
    //get students coins
    data = await getStudentCoins();
    console.log(data.data[0].Coins);

    setCoins(data.data[0].Coins);
    // get students classes
    data = await getStudentsClassses();

    if (data.hasOwnProperty("data")) {
      setClasses(data.data);
    }

    const token = JSON.parse(sessionStorage.getItem("token"));
    data = await getUserDetails(token);
    // console.log(data);
    if (data.hasOwnProperty("data")) {
      const { FirstName, LastName, Email } = data.data[0];
      setUsersName(`${FirstName} ${LastName}`);
    }

    data = await getStudentsAssignmentQuizzes();
    console.log(data);
    if (data.hasOwnProperty("quizzes")) {
      setAssignments(data.quizzes);
    }
  }, []);

  return (
    <div className="content-box">
      <div className="container wide-container center-container">
        <h1>Student profile</h1>
        <div className="container wide-container center-container">
          <div className="banner">
            <div className="top">
              <div className="settings-btn">
                <Link to="/user_settings" style={{ textDecoration: "none" }}>
                  <FaCog />
                </Link>
              </div>
            </div>
            <div className="upper">
              <div className="user-icon">
                <img src={studentIcon} alt="user icon" height="100px" />
                <div className="xp">
                  <p>{xp}xp</p>
                </div>
              </div>
              <div className="detail_box">
                <div className="box">
                  <p>{coins} Coins</p>
                </div>
                <div className="name-box">
                  <p>{usersName}</p>
                </div>
              </div>
            </div>
            <div className="progressbar">
              <div className="bar-fill"></div>
            </div>
          </div>
          <div className="content">
            <div className="tabs">
              {tabs.map((tab, i) => {
                let isSelected = false;
                let j = i + 1;
                if (j === selectedTab) {
                  isSelected = true;
                }
                return (
                  <h3
                    key={j}
                    aria-selected={isSelected}
                    onClick={() => setSelectedTab(j)}
                  >
                    {tab}
                  </h3>
                );
              })}
            </div>
            {selectedTab == 1 ? (
              <div className="class-items list-items">
                {classes.map((c) => (
                  <ClassItem
                    key={c.ClassDetailsID}
                    id={c.ClassDetailsID}
                    name={c.Name}
                    firstname={c.FirstName}
                    lastname={c.LastName}
                    yearGroup={c.YearGroup}
                  />
                ))}
              </div>
            ) : (
              <></>
            )}

            {selectedTab == 2 ? <></> : <></>}

            {selectedTab == 3 ? (
              <div className="assignment-items list-items">
                {assignments.map((a) => (
                  <AssignmentItem
                    key={a.QuizID}
                    id={a.QuizID}
                    assignmentName={a.QuizName}
                    teacherName={`${a.FirstName} ${a.LastName}`}
                    ModuleName={a.ModuleName}
                    Caption={a.Caption}
                    dueDate={a.DueDate}
                  />
                ))}
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;
