import React, { useEffect, useState } from "react";

import CreateQuestionBox from "../../Components/CreateQuestionBox";

const QuizDesigner = () => {
  const [questions, setQuestions] = useState([]);

  //for testing
  useEffect(() => {
    console.log(questions);
  }, [questions]);

  const addQuestion = (e) => {
    e.preventDefault();
    //create empty question
    const question = {
      id: questions.length,
      name: "",
      details: "",
      correct: 0,
      options: [],
    };
    //add question to question array
    setQuestions([...questions, question]);
  };
  const updateQuestion = (qID, updatedQuestion) => {
    // copy old data
    let newData = [...questions];
    // update value based on question ID
    newData[qID] = updatedQuestion;
  };

  const createQuiz = () => {
    console.log(questions);
  };
  //TODO: create quiz title
  return (
    <div className="content-box">
      <h1>Quiz designer</h1>
      <div className="container wide-container">
        {questions.map((quest, index) => {
          return (
            <CreateQuestionBox
              key={quest.id}
              qID={quest.id}
              thisQuestion={questions[quest.id]}
              updateQuestion={updateQuestion}
            />
          );
        })}
        {/* <CreateQuestionBox /> */}
        <button className="add-question btn" onClick={addQuestion}>
          +
        </button>
        <button className="btn" onClick={createQuiz}>
          Finish
        </button>
      </div>
    </div>
  );
};

export default QuizDesigner;
