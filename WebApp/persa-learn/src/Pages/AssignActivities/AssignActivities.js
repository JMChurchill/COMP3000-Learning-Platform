import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import TeachersQuizzes from "../../Components/QuizDesigner/TeachersQuizzes";
import {
  assignQuizToClass,
  deleteTheQuiz,
  viewTeachersQuizzes,
  viewTeachersQuizzesByClass,
} from "../../http_Requests/teacherRequests";

import styles from "./AssignActivities.module.css";

import "react-datepicker/dist/react-datepicker.css";
import AssignmentOverlay from "../../Components/TeacherProfile/AssignActivities/AssignmentOverlay";
import DeleteOverlay from "../../Components/TeacherProfile/AssignActivities/DeleteOverlay";

const AssignActivities = () => {
  const { state } = useLocation();

  const [selectedClass, setSelectedClass] = useState("");
  const [quizzes, setQuizzes] = useState([]);
  const [dueDate, setDueDate] = useState(null);
  const [quizID, setQuizID] = useState(null);
  const [xp, setXp] = useState(0);
  const [coins, setCoins] = useState(0);

  const [settingDate, setSettingDate] = useState(false);
  const [isDeleting, setIsDelete] = useState(false);

  console.log(state);
  useEffect(async () => {
    await setSelectedClass({
      classID: state.id,
      className: state.name,
      yearGroup: state.yearGroup,
    });
    const data = await viewTeachersQuizzesByClass(state.id);
    console.log("quizzes: ", data);
    setQuizzes(data.quizzes);
  }, []);

  const assignToClass = async (qID) => {
    setQuizID(qID);
    setSettingDate(true);
  };

  const submitAssignToClass = async () => {
    const data = await assignQuizToClass({
      coins,
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
    setQuizID(quizID);
    // show overlay message
    setIsDelete(true);
  };
  const deleteNow = async () => {
    console.log(`Deleted ${quizID}`);
    // delete quiz from database
    const res = await deleteTheQuiz({ quizID });
    console.log(res);
    // display message if unsuccessful
    if (res.status !== "success") {
      alert("error occured when deleting");
    }
    //get all quizzes
    const data = await viewTeachersQuizzesByClass(state.id);
    setQuizzes(data.quizzes);
    // hide overlay message
    setIsDelete(false);
  };
  return (
    <div className="content-box">
      {/* <div className="container wide-container center-container"> */}
      <h1>Assign quizzes to class {selectedClass.className}</h1>
      {/* <div className="container wide-container center-container"> */}
      {/* <div className="content"> */}
      <div className={styles.container}>
        <TeachersQuizzes
          quizzes={quizzes}
          assignToClass={assignToClass}
          deleteQuiz={deleteQuiz}
          selectedClass={selectedClass}
        />
      </div>
      {/* </div> */}
      {/* </div> */}
      {settingDate ? (
        <AssignmentOverlay
          dueDate={dueDate}
          setDueDate={setDueDate}
          setXp={setXp}
          setCoins={setCoins}
          submitAssignToClass={submitAssignToClass}
          setSettingDate={setSettingDate}
        />
      ) : (
        <></>
      )}
      {isDeleting ? (
        <DeleteOverlay setIsDelete={setIsDelete} deleteNow={deleteNow} />
      ) : (
        <></>
      )}
    </div>
  );
};

export default AssignActivities;
