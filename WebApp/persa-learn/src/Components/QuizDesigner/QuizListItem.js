import React from "react";
import { MdAdd, MdDelete } from "react-icons/md";
import styles from "./QuizListItem.module.css";
import ToolTip from "../../Components/ToolTip";

const QuizListItem = ({
  id,
  name,
  module = "place holder",
  numQuest = "place holder",
  dueDate = "",

  assignToClass,
  deleteQuiz,
}) => {
  return (
    // <div className="quiz-list-items quiz-cols">
    <div className={styles.quiz_cols}>
      <p>{name}</p>
      <p className={styles.module}>{module}</p>
      <p className={styles.num_quest}>{numQuest}</p>
      <div className={styles.icon}>
        <ToolTip
          Icon={MdAdd}
          action={assignToClass}
          id={id}
          text={"Assign to class"}
        />
        <ToolTip
          Icon={MdDelete}
          action={deleteQuiz}
          id={id}
          text={"Delete Quiz"}
        />
        {/* <div className="tooltip">
          <MdAdd onClick={() => assignToClass(id)} />
          <span className="tooltiptext">Assign to class</span>
        </div>
        <div className="tooltip">
          <MdDelete onClick={() => deleteQuiz(id)} />
          <span className="tooltiptext">Delete Quiz</span>
        </div> */}
        {/* <MdDelete /> */}
      </div>
      {/* <p>place holder</p> */}
      <p>{dueDate ? new Date(dueDate).toLocaleDateString("en-GB") : ""}</p>
    </div>
  );
};

export default QuizListItem;
