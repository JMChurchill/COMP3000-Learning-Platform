import React from "react";

import CreateQuestionBox from "../../Components/CreateQuestionBox";

const QuizDesigner = () => {
  return (
    <div className="content-box">
      <h1>Quiz designer</h1>
      <div className="container wide-container left-container">
        <CreateQuestionBox />
        <button className="add-question btn">+</button>
      </div>
    </div>
  );
};

export default QuizDesigner;
