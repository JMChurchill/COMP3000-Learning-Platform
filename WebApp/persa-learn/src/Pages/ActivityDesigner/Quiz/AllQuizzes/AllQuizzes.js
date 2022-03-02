import React, { useEffect, useState } from "react";
import { IoAdd } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import QuizListItem from "../../../../Components/QuizDesigner/QuizListItem";
import TeachersQuizzes from "../../../../Components/QuizDesigner/TeachersQuizzes";
import { viewTeachersQuizzes } from "../../../../http_Requests/teacherRequests";

const AllQuizzes = () => {
  const [quizzes, setQuizzes] = useState([]);

  // const navigate = useNavigate();

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
            <TeachersQuizzes quizzes={quizzes} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllQuizzes;
