import React from "react";

const LeaderboardStudent = ({
  name = "TempName",
  icon,
  xp = "200",
  place = "4",
}) => {
  return (
    <div className="leaderboard-student">
      <p>{place}</p>
      <img src={icon} alt="user icon" height="75px" />
      <h2>{name}</h2>
      <p>{xp}xp</p>
    </div>
  );
};

export default LeaderboardStudent;
