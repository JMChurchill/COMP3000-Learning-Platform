import React from "react";

import CreateQuestionBox from "../Components/CreateQuestionBox";

const QuizDesigner = () => {
  return (
    <div className="content-box">
      <h1>Quiz designer</h1>
      <div className="container wide-container center-container">
        <CreateQuestionBox />
      </div>
    </div>
  );
};

export default QuizDesigner;
