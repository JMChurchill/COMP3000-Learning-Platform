import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import TeachersQuizzes from "../../Components/QuizDesigner/TeachersQuizzes";
import {
  assignQuizToClass,
  deleteTheQuiz,
  viewTeachersQuizzes,
  viewTeachersQuizzesByClass,
} from "../../http_Requests/teacherRequests";

import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

const AssignActivities = () => {
  const { state } = useLocation();

  const [selectedClass, setSelectedClass] = useState("");
  const [quizzes, setQuizzes] = useState([]);
  const [dueDate, setDueDate] = useState(null);
  const [quizID, setQuizID] = useState(null);
  const [xp, setXp] = useState(0);

  const [settingDate, setSettingDate] = useState(false);

  console.log(state);
  useEffect(async () => {
    await setSelectedClass({
      classID: state.id,
      className: state.name,
      yearGroup: state.yearGroup,
    });
    // const data = await viewTeachersQuizzes();
    const data = await viewTeachersQuizzesByClass(state.id);
    console.log("quizzes: ", data);
    setQuizzes(data.quizzes);
  }, []);

  const assignToClass = async (qID) => {
    // console.log(`assigned ${qID} to class ${selectedClass.classID}`);
    setQuizID(qID);
    // const data = await assignQuizToClass({
    //   classID: selectedClass.classID,
    //   quizID,
    // });
    // console.log(data);

    setSettingDate(true);
  };

  const submitAssignToClass = async () => {
    // console.log("The due date: ", dueDate);
    // console.log(dueDate.toLocaleString("en-US"));
    // console.log(dueDate.toISOString().slice(0, 19).replace("T", " "));
    const data = await assignQuizToClass({
      xp,
      classID: selectedClass.classID,
      quizID,
      dueDate: dueDate.toISOString().slice(0, 19).replace("T", " "),
    });
    console.log(data);
    if (data.status === "failure")
      alert("an error occured when attempting to assign");
    else {
      const data = await viewTeachersQuizzesByClass(state.id);
      setQuizzes(data.quizzes);
    }
    setSettingDate(false);
  };

  const deleteQuiz = async (quizID) => {
    console.log(`Deleted ${quizID}`);
    const res = await deleteTheQuiz({ quizID });
    console.log(res);
    //TODO: fix
    // const data = await viewTeachersQuizzes();
    const data = await viewTeachersQuizzesByClass(state.id);

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
      <div className="overlay" aria-disabled={!settingDate}>
        <div className="message-box">
          <h1>Assign module</h1>
          <DatePicker
            selected={dueDate}
            onChange={(date) => setDueDate(date)}
            placeholderText="Due date"
            dateFormat="dd/MM/yyyy"
            minDate={new Date()}
          />
          <input placeholder="xp" onChange={(e) => setXp(e.target.value)} />
          <button className="btn" onClick={() => submitAssignToClass()}>
            Ok
          </button>

          <button
            className="btn"
            onClick={() => {
              setSettingDate(false);
            }}
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default AssignActivities;
