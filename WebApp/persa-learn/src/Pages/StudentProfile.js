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
  getStudentsClassses,
  getUserDetails,
} from "../http_Requests/userRequests";
import ClassItem from "../Components/ClassItem";
import AssignmentItem from "../Components/AssignmentItem";

const StudentProfile = () => {
  const [classes, setClasses] = useState([]);
  const [usersName, setUsersName] = useState();
  const [selectedTab, setSelectedTab] = useState(1);
  useEffect(async () => {
    let data = await getStudentsClassses();
    setClasses(data);

    const token = JSON.parse(sessionStorage.getItem("token"));
    data = await getUserDetails(token);
    const { FirstName, LastName, Email } = data[0];
    setUsersName(`${FirstName} ${LastName}`);
    // console.log(usersName);
  }, []);
  const goToSettings = () => {
    console.log("go to settings");
    // <Route to="/somewhere/else" />;
  };
  console.log(selectedTab);

  return (
    <div className="content-box">
      <div className="container wide-container center-container">
        <h1>Student profile</h1>
        <div className="container wide-container center-container">
          <div className="banner">
            <div className="top">
              <div className="settings-btn">
                <Link to="/user_settings" style={{ textDecoration: "none" }}>
                  <FaCog onClick={goToSettings} />
                </Link>
              </div>
            </div>
            <div className="upper">
              <div className="user-icon">
                <img src={studentIcon} alt="user icon" height="100px" />
                <div className="xp">
                  <p>100xp</p>
                </div>
              </div>
              <div className="name-box">
                <p>{usersName}</p>
              </div>
            </div>
            <div className="progressbar">
              <div className="bar-fill"></div>
            </div>
          </div>
          <div className="content">
            <div className="tabs">
              <h3 onClick={() => setSelectedTab(1)}>Classes</h3>
              <h3 onClick={() => setSelectedTab(2)}>Achievements</h3>
              <h3 onClick={() => setSelectedTab(3)}>Assignments</h3>
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
                {classes.map((c) => (
                  <>
                    <AssignmentItem key={c.ClassDetailsID} />
                    <AssignmentItem key={c.ClassDetailsID} />
                  </>
                ))}
              </div>
            ) : (
              <></>
            )}

            {/* // <div className="class-items">
            //   {classes.map((c) => (
            //     <ClassItem
            //       id={c.ClassDetailsID}
            //       name={c.Name}
            //       firstname={c.FirstName}
            //       lastname={c.LastName}
            //       yearGroup={c.YearGroup}
            //     />
            //   ))}
            // </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;
