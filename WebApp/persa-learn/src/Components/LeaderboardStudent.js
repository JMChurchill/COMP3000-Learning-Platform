import React from "react";

const LeaderboardStudent = ({
  name = "TempName",
  icon,
  xp = "200",
  position = "4",
}) => {
  return (
    <div className="leaderboard-student">
      <p>{position}</p>
      <img src={icon} alt="user icon" height="75px" />
      <h2>{name}</h2>
      <p>{xp}xp</p>
    </div>
  );
};

export default LeaderboardStudent;
