import React from "react";

const TopStudent = ({ name = "TempName", icon, xp = "200", position }) => {
  return (
    <div
      className="top-student"
      style={
        position == 2
          ? { transform: "scale(0.8)" }
          : position == 3
          ? { transform: "scale(0.8)" }
          : {}
      }
    >
      <div
        className="img-container"
        style={
          position == 2
            ? { backgroundColor: "silver" }
            : position == 3
            ? { backgroundColor: "#A15727" }
            : {}
        }
      >
        <img src={icon} alt="user icon" height="100px" />
      </div>
      <p>{position}</p>
      <p>{name}</p>
      <p>{xp}xp</p>
    </div>
  );
};

export default TopStudent;
