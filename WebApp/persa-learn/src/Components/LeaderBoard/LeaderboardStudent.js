import React from "react";
import styles from "./LeaderboardStudent.module.css";

const LeaderboardStudent = ({
  name = "TempName",
  icon,
  xp = "200",
  position,
}) => {
  return (
    <div className={styles.leaderboard_student}>
      <p>{position}</p>
      {/* <div className="img-container"> */}
      <div
        style={{ backgroundImage: `url(${icon})`, backgroundSize: "cover" }}
        className={styles.image}
      ></div>
      {/* <img src={icon} alt="user icon" height="75px" /> */}
      {/* </div> */}
      <p>{name}</p>
      <p>{xp}xp</p>
    </div>
  );
};

export default LeaderboardStudent;
