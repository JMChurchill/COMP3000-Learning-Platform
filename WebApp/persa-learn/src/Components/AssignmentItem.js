import React from "react";

const AssignmentItem = ({
  id,
  name = "task",
  className = "class",
  teacherName = "teacher",
  taskType = "quiz",
}) => {
  return (
    <div key={id} className="assignment-item">
      <p>{name}</p>
      <p>{`Class: ${className}`}</p>
      <p>Type: {taskType}</p>
      <p>Teacher: {taskType}</p>
    </div>
  );
};

export default AssignmentItem;
