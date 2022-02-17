import React from "react";

const ClassItem = ({ id, name, firstname, lastname, yearGroup }) => {
  return (
    <div key={id} className="class-item">
      <p>{name}</p>
      <p>{`Teacher: ${firstname} ${lastname}`}</p>
      <p>Year: {yearGroup}</p>
    </div>
  );
};

export default ClassItem;
