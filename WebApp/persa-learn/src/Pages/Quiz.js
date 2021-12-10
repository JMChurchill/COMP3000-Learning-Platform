import React from "react";

import QuizBox from "../Components/QuizBox";
import Progressbar from "../Components/Progressbar";
import tempQuizData from "../assets/tempQuizData.json";

const Quiz = () => {
  return (
    <div className="content-box">
      <h1>Quiz</h1>
      <div className="container wide-container center-container">
        <Progressbar />
        {tempQuizData.map((question) => {
          return (
            <QuizBox
              question={question.question}
              details={question.details}
              options={question.options}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Quiz;
