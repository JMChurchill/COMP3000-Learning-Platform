import React from "react";

const QuizBox = ({
  question = "placeholder",
  details = "details here",
  options = ["as", "df", "gh", "jk"],
}) => {
  return (
    <div className="quiz-question">
      <div className="question-box">
        <h2>{question}</h2>
        <p>{details}</p>
      </div>
      <ol type="a" className="quiz-answers">
        {options.map((ans) => {
          return <li>{ans}</li>;
        })}
      </ol>
    </div>
  );
};

export default QuizBox;
