import React from "react";
import { useNavigate } from "react-router-dom";

const AssignmentItem = ({
  id,
  assignmentName = "placeholder",
  // assignmentName = "class",
  teacherName = "placeholder",
  taskType = "placeholder",
  ModuleName,
}) => {
  const navigate = useNavigate();

  return (
    <div
      key={id}
      className="assignment-item"
      onClick={() =>
        navigate("/quiz", {
          state: {
            quizID: id,
          },
        })
      }
    >
      <p>{`Class: ${assignmentName}`}</p>
      <p>Type: {taskType}</p>
      <p>Teacher: {teacherName}</p>
      <p>Module: {ModuleName}</p>
    </div>
  );
};

export default AssignmentItem;
