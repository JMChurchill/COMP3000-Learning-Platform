import React from "react";

const Class = ({ id, name = "name", yearGroup = 10, overdue = 10 }) => {
  // console.log(id);
  return (
    <div className="Task">
      <h2>{name}</h2>
      <p>Year Group: {yearGroup}</p>
      <p>Overdue: {overdue}</p>
    </div>
  );
};

export default Class;
