import React from "react";

const QuizListItem = ({
  name,
  module = "place holder",
  numQuest = "place holder",
}) => {
  return (
    <div className="quiz-list-items quiz-cols">
      <p>{name}</p>
      <p>{module}</p>
      <p>{numQuest}</p>
    </div>
  );
};

export default QuizListItem;
