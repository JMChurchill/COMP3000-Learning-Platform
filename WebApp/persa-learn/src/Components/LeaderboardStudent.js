import React from "react";

const LeaderboardStudent = ({
  name = "TempName",
  icon,
  xp = "200",
  position,
}) => {
  return (
    <div className="leaderboard-student">
      <p>{position}</p>
      {/* <div className="img-container"> */}
      <img src={icon} alt="user icon" height="75px" />
      {/* </div> */}
      <h2>{name}</h2>
      <p>{xp}xp</p>
    </div>
  );
};

export default LeaderboardStudent;
