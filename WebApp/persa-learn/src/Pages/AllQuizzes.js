import React, { useEffect, useState } from "react";
import { IoAdd } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import QuizListItem from "../Components/QuizDesigner/QuizListItem";
import { viewTeachersQuizzes } from "../http_Requests/teacherRequests";

const AllQuizzes = () => {
  const [quizzes, setQuizzes] = useState([]);

  const navigate = useNavigate();

  useEffect(async () => {
    const data = await viewTeachersQuizzes();
    console.log(data);
    setQuizzes(data.quizzes);
  }, []);

  return (
    <div className="content-box">
      <div className="container wide-container center-container">
        <h1>All quizzes</h1>
        <div className="container wide-container center-container">
          <div className="content">
            <div className="quiz-items">
              <div className="quiz-cols quiz-col-names">
                <p>Quiz names</p>
                <p>Module</p>
                <p>Number of Questions</p>
              </div>
              {quizzes.map((quiz) => {
                return <QuizListItem key={quiz.QuizID} name={quiz.QuizName} />;
              })}
              {/* <div className="quiz-list-items quiz-cols">
                <p>quiz name</p>
                <p>module</p>
                <p>12</p>
              </div>
              <div className="quiz-list-items quiz-cols">
                <p>quiz name</p>
                <p>module</p>
                <p>12</p>
              </div>
              <div className="quiz-list-items quiz-cols">
                <p>quiz name</p>
                <p>module</p>
                <p>12</p>
              </div> */}
              <div
                className="add-quiz"
                onClick={() => navigate("/designer_quiz")}
              >
                <div className="circle">
                  <IoAdd />
                </div>
                <p>Create Quiz</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllQuizzes;
