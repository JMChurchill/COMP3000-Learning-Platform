import React from "react";
import { useNavigate } from "react-router-dom";

const AssignmentItem = ({
  id,
  assignmentName = "placeholder",
  // assignmentName = "class",
  teacherName = "placeholder",
  taskType = "placeholder",
  ModuleName,
  dueDate,
  Caption,
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
      <p>{`Assignment name: ${assignmentName}`}</p>
      <p>Type: {Caption}</p>
      <p>Teacher: {teacherName}</p>
      <p>Module: {ModuleName}</p>
      <p>
        Due date: {dueDate ? new Date(dueDate).toLocaleDateString("en-GB") : ""}
      </p>
    </div>
  );
};

export default AssignmentItem;
