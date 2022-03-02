import React from "react";
import { MdAdd } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import QuizListItem from "./QuizListItem";

const TeachersQuizzes = ({ quizzes = [], assignToClass, deleteQuiz }) => {
  const navigate = useNavigate();

  return (
    <>
      <div className="quiz-items">
        <div className="quiz-cols quiz-col-names">
          <p>Quiz names</p>
          <p>Module</p>
          <p>Number of Questions</p>
          <p>Options</p>
        </div>
        {quizzes.map((quiz) => {
          return (
            <QuizListItem
              key={quiz.QuizID}
              id={quiz.QuizID}
              name={quiz.QuizName}
              module={quiz.ModuleName}
              assignToClass={assignToClass}
              deleteQuiz={deleteQuiz}
            />
          );
        })}
        <div className="add-quiz" onClick={() => navigate("/designer_quiz")}>
          <div className="circle">
            <MdAdd />
          </div>
          <p>Create Quiz</p>
        </div>
      </div>
    </>
  );
};

export default TeachersQuizzes;
