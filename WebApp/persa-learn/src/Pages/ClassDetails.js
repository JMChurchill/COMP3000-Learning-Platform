import React from "react";

const ClassDetails = ({ name = "Name" }) => {
  return (
    <div className="class-details">
      <h2>Class {name}'s Details</h2>
      <p>Nearest due date: </p>
      <p>Overall class progress</p>
      <div className="progressbar">
        <div className="bar-fill-left">
          <p>23</p>
        </div>
        <div className="bar-fill-right">
          <p>7</p>
        </div>
      </div>
      <button className="btn">More details</button>
    </div>
  );
};

export default ClassDetails;
