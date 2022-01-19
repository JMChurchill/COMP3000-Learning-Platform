import React from "react";

const QuizBox = ({
  questionId,
  question = "placeholder",
  details = "details here",
  options = ["as", "df", "gh", "jk"],
  addAnswer,
}) => {
  const logToCon = (e) => {
    // console.log(e, { props: { id: Number(e.currentTarget.id) } });
    console.log(e.currentTarget.id);
    addAnswer(questionId, e.currentTarget.id);
    // console.log("aaa");
  };
  return (
    <div className="quiz-question">
      <div className="question-box">
        <h2>{question}</h2>
        <p>{details}</p>
      </div>
      <ol type="a" className="quiz-answers">
        {options.map((ans, i) => {
          return (
            <li key={i} id={i} onClick={logToCon}>
              {ans}
            </li>
          );
        })}
      </ol>
    </div>
  );
};

export default QuizBox;
