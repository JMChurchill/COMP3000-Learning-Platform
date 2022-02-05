import React from "react";

const Class = ({ name = "name", numStudents = 10, overdue = 10 }) => {
  return (
    <div className="Task">
      <h2>{name}</h2>
      <p>Number students: {numStudents}</p>
      <p>Overdue: {overdue}</p>
    </div>
  );
};

export default Class;
