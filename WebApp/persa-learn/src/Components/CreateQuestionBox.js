import React from "react";

// component
import AddOptionBtn from "./AddOptionBtn";
import NewOption from "./NewOption";

const CreateQuestionBox = () => {
  return (
    <div className="quiz-question">
      <div className="question-box">
        <h2>Add Question</h2>
        <p>add details</p>
      </div>
      <p>Correct answer</p>
      {/* <div className="options-box"> */}
      <NewOption />
      <NewOption />
      <NewOption />
      {/* </div> */}
      <div className="bottom">
        <AddOptionBtn />
      </div>
    </div>
  );
};

export default CreateQuestionBox;
