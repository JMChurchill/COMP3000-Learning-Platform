import React from "react";

const Class = ({
  id,
  name = "no name",
  yearGroup = 10,
  overdue = 10,
  setSelectedClass,
  classSelected,
}) => {
  // console.log(classSelected);
  // if (classSelected)
  return (
    <div
      className="Task"
      aria-selected={classSelected}
      // aria-selected="true"
      onClick={() => setSelectedClass({ id, name, yearGroup })}
    >
      <h2>{name}</h2>
      <p>Year Group: {yearGroup}</p>
      <p>Overdue: {overdue}</p>
    </div>
  );
};

export default Class;
