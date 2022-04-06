import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteClass } from "../../../http_Requests/teacherRequests";
import CustomButton from "../../CustomButton";
import OverlayConfirm from "../../OverlayConfirm";
import ListStudents from "./ListStudents";
import SearchStudents from "./SearchStudents";
import UpdateClass from "../UpdateClass";
import styles from "./ClassDetails.module.css";
import Progressbar from "./Progressbar";

const ClassDetails = ({
  name = "Name",
  setSelectedClass,
  selectedClass,
  classID,
  yearGroup,
  classChanged,
  setIsSearching,
  isSearching,
  setIsUpdating,
  isUpdating,
  setIsShowStudents,
  isShowStudents,
}) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const navigate = useNavigate();

  const flipIsUpdating = () => {
    setIsUpdating(!isUpdating);
  };

  const flipIsShowStudents = () => {
    setIsShowStudents(!isShowStudents);
  };

  const deleteThisClass = async () => {
    // check if user wants to delete
    let data = await deleteClass({ classID });
    console.log(data);
    classChanged();
    setIsDeleting(false);
    setSelectedClass();
  };
  if (isSearching)
    return (
      <SearchStudents
        setSelectedClass={selectedClass}
        classID={classID}
        setIsSearching={setIsSearching}
        isSearching={isSearching}
      />
    );
  if (isUpdating)
    return (
      <UpdateClass
        selectedClass={selectedClass}
        classID={classID}
        classChanged={classChanged}
        flipIsUpdating={flipIsUpdating}
      />
    );
  if (isShowStudents)
    return (
      <ListStudents classID={classID} flipIsShowStudents={flipIsShowStudents} />
    );

  return (
    // <div className="right-box vFill">
    <>
      {/* <div className="class-details"> */}
      <div className={styles.class_details}>
        <h2>Class {name}'s Details</h2>
        {/* <p>ID {classID}</p> */}
        <p>Year Group: {yearGroup}</p>
        <p>Number of students:</p>
        <p>Nearest due date: </p>
        <p>Class Progress:</p>
        <Progressbar complete={10} incomplete={5} />
        {/* <div className="progressbar">
          <div className="bar-fill-left">
            <p>23</p>
          </div>
          <div className="bar-fill-right">
            <p>7</p>
          </div>
        </div> */}
        <CustomButton
          text={"Add Student"}
          onClick={() => setIsSearching(!isSearching)}
        />
        <CustomButton
          text={"View Students"}
          onClick={() => flipIsShowStudents()}
        />
        <CustomButton
          text={"Update Class"}
          // onClick={() => setIsDeleting(true)}
          onClick={() => flipIsUpdating()}
        />
        <CustomButton
          text={"Delete Class"}
          // onClick={() => flipIsShowStudents()}
          onClick={() => setIsDeleting(true)}
        />
        <CustomButton
          text={"Assignments"}
          onClick={() =>
            navigate("/Assign", {
              state: selectedClass,
            })
          }
        />
      </div>
      {isDeleting ? (
        <OverlayConfirm
          message={"Are you sure you want to delete this class?"}
          yes={() => deleteThisClass()}
          no={() => setIsDeleting(false)}
        />
      ) : (
        <></>
      )}
      {/* // </div> */}
    </>
  );
};

export default ClassDetails;
