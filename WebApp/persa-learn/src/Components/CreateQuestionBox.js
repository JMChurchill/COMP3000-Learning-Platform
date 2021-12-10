import React from "react";

// component
import AddOptionBtn from "./AddOptionBtn";

const CreateQuestionBox = () => {
  return (
    <div className="quiz-question">
      <div className="question-box">
        <h2>Add Question</h2>
        <p>add details</p>
      </div>
      {/* <div className="options-box"> */}
      <p>aa</p>
      {/* </div> */}
      <div className="bottom">
        <AddOptionBtn />
      </div>
    </div>
  );
};

export default CreateQuestionBox;
