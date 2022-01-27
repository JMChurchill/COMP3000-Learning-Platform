import React, { useState } from "react";

import CreateQuestionBox from "../../Components/CreateQuestionBox";

const QuizDesigner = () => {
  const [questions, setQuestions] = useState([]);
  const addQuestion = (e) => {
    e.preventDefault();
    setQuestions([...questions, ""]);
    console.log("aa");
  };
  return (
    <div className="content-box">
      <h1>Quiz designer</h1>
      <div className="container wide-container">
        {questions.map((quest, index) => {
          return <CreateQuestionBox key={index} />;
        })}
        {/* <CreateQuestionBox /> */}
        <button className="add-question btn" onClick={addQuestion}>
          +
        </button>
      </div>
    </div>
  );
};

export default QuizDesigner;
