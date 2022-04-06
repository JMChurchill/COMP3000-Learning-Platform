import React from "react";
import ClassItem from "./ClassItem";
import styles from "./ClassList.module.css";

const ClassList = ({
  classes,
  flipAddClass,
  selectedClass,
  setSelectedClass,
}) => {
  return (
    // <div className="left-box task-box">
    <div
      //   className="left-box"
      className={styles.container}
      style={{ position: "relative", borderRadius: "0.2rem" }}
    >
      {/* <div className="class-list task-box"> */}
      <div className={styles.task_box}>
        <div className={styles.col_names}>
          <p>Class Name</p>
          <p>Year Group</p>
          <p>Overdue</p>
        </div>
        {classes.map((c, i) => {
          let classSelected = false;
          if (selectedClass) {
            if (selectedClass.id === c.classdetailsID) {
              classSelected = true;
            }
          }
          return (
            <ClassItem
              key={c.classdetailsID}
              id={c.classdetailsID}
              name={c.Name}
              yearGroup={c.YearGroup}
              setSelectedClass={setSelectedClass}
              classSelected={classSelected}
            />
          );
        })}
      </div>
      {/* <div className="bottom-bar"> */}
      <div className={styles.bottom_bar}>
        <button
          className="btn"
          onClick={() => {
            flipAddClass();
          }}
        >
          Add class
        </button>
      </div>
    </div>
  );
};

export default ClassList;
