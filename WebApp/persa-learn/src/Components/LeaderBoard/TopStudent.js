import React from "react";

const TopStudent = ({ name = "TempName", icon, xp = "200", position }) => {
  return (
    <div className="top-student">
      <div className="img-container">
        <img src={icon} alt="user icon" height="100px" />
      </div>
      <p>{position}</p>
      <p>{name}</p>
      <p>{xp}</p>
    </div>
  );
};

export default TopStudent;
