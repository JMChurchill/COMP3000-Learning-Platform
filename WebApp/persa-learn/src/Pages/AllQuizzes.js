import React from "react";
import { IoAdd } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const AllQuizzes = () => {
  const navigate = useNavigate();

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
              <div className="quiz-list-items quiz-cols">
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
              </div>
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
