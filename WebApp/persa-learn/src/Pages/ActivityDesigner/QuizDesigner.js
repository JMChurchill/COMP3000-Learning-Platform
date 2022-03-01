import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import CreateQuestionBox from "../../Components/QuizDesigner/CreateQuestionBox";
import { createTheQuiz } from "../../http_Requests/teacherRequests";

const QuizDesigner = () => {
  const [title, setTitle] = useState();
  const [questions, setQuestions] = useState([]);

  const [isComplete, setIsComplete] = useState(false);

  const navigate = useNavigate();

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

  const createQuiz = async () => {
    // send this to API
    console.log("Title: ", title);
    console.log("Questions: ", questions);

    const data = await createTheQuiz({ title, questions });

    //{status, quizID} = data
    console.log(data);
    setIsComplete(true);
  };

  return (
    <div className="content-box">
      <h1>Quiz designer</h1>
      <div className="container wide-container">
        <div className="create-quiz-title">
          <input
            type="text"
            placeholder="QuizTitle"
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
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
      <div className="overlay" aria-disabled={!isComplete}>
        <div className="message-box">
          <h1>Created {title} Quiz</h1>
          <button className="btn" onClick={() => navigate("/quiz/all")}>
            View all quizzes
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuizDesigner;
