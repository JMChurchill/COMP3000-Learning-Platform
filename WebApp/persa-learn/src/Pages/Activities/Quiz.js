import React from "react";

import QuizBox from "../../Components/QuizBox";
import Progressbar from "../../Components/Progressbar";
import tempQuizData from "../../assets/tempQuizData.json";

const Quiz = () => {
  const answers = new Array(tempQuizData.length);
  const addAnswer = (questionId, answerIdx) => {
    // answers.push({ questionId, answerIdx });
    answers[questionId] = answerIdx;
    console.log(answers);
  };
  return (
    <div className="content-box">
      <h1>Quiz</h1>
      <div className="container wide-container center-container">
        <Progressbar />
        {tempQuizData.map((question) => {
          return (
            <QuizBox
              questionId={question.id}
              question={question.question}
              details={question.details}
              options={question.options}
              addAnswer={addAnswer}
            />
          );
        })}
      </div>
      <button className="btn">Complete</button>
    </div>
  );
};

export default Quiz;
