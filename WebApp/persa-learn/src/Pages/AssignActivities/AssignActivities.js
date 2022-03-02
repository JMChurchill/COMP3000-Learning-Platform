import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import TeachersQuizzes from "../../Components/QuizDesigner/TeachersQuizzes";
import {
  assignQuizToClass,
  deleteTheQuiz,
  viewTeachersQuizzes,
} from "../../http_Requests/teacherRequests";

const AssignActivities = () => {
  const { state } = useLocation();

  const [selectedClass, setSelectedClass] = useState("");
  const [quizzes, setQuizzes] = useState([]);

  console.log(state);
  useEffect(async () => {
    setSelectedClass({
      classID: state.id,
      className: state.name,
      yearGroup: state.yearGroup,
    });
    const data = await viewTeachersQuizzes();
    console.log(data);
    setQuizzes(data.quizzes);
  }, []);

  const assignToClass = async (quizID) => {
    console.log(`assigned ${quizID} to class ${selectedClass.classID}`);
    const data = await assignQuizToClass({
      classID: selectedClass.classID,
      quizID,
    });

    console.log(data);
  };

  const deleteQuiz = async (quizID) => {
    console.log(`Deleted ${quizID}`);
    const res = await deleteTheQuiz({ quizID });
    console.log(res);
    const data = await viewTeachersQuizzes();
    setQuizzes(data.quizzes);
  };
  return (
    <div className="content-box">
      <div className="container wide-container center-container">
        <h1>Assign quizzes to class {selectedClass.className}</h1>
        <div className="container wide-container center-container">
          <div className="content">
            <TeachersQuizzes
              quizzes={quizzes}
              assignToClass={assignToClass}
              deleteQuiz={deleteQuiz}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssignActivities;
