import React from "react";
import { MdAdd, MdDelete } from "react-icons/md";

const QuizListItem = ({
  id,
  name,
  module = "place holder",
  numQuest = "place holder",
  dueDate = "",

  assignToClass,
  deleteQuiz,
}) => {
  return (
    <div className="quiz-list-items quiz-cols">
      <p>{name}</p>
      <p>{module}</p>
      <p>{numQuest}</p>
      <div className="icon">
        <div className="tooltip">
          <MdAdd onClick={() => assignToClass(id)} />
          <span className="tooltiptext">Assign to class</span>
        </div>
        <div className="tooltip">
          <MdDelete onClick={() => deleteQuiz(id)} />
          <span className="tooltiptext">Delete Quiz</span>
        </div>
        {/* <MdDelete /> */}
      </div>
      {/* <p>place holder</p> */}
      <p>{dueDate ? new Date(dueDate).toLocaleDateString("en-GB") : ""}</p>
    </div>
  );
};

export default QuizListItem;
