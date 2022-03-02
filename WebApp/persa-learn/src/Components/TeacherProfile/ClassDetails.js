import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteClass } from "../../http_Requests/teacherRequests";
import ListStudents from "./ListStudents";
import SearchStudents from "./SearchStudents";
import UpdateClass from "./UpdateClass";

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
  // const [isSearching, setIsSearching] = useState(false);
  // const [isUpdating, setIsUpdating] = useState(false);
  // const [isShowStudents, setIsShowStudents] = useState(false);

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
    <div className="right-box vFill">
      <div className="class-details">
        <h2>Class {name}'s Details</h2>
        <p>ID {classID}</p>
        <p>Year Group: {yearGroup}</p>
        <p>Nearest due date: </p>
        <p>Overall class progress</p>
        <p>Number of students</p>
        <div className="progressbar">
          <div className="bar-fill-left">
            <p>23</p>
          </div>
          <div className="bar-fill-right">
            <p>7</p>
          </div>
        </div>
        <button className="btn" onClick={() => setIsSearching(!isSearching)}>
          Add Student to class
        </button>
        <button className="btn" onClick={() => flipIsUpdating()}>
          Update class
        </button>
        <button className="btn" onClick={() => setIsDeleting(true)}>
          Delete class
        </button>
        <button className="btn" onClick={() => flipIsShowStudents()}>
          Show all students
        </button>
        <button
          className="btn"
          onClick={() =>
            navigate("/Assign", {
              state: selectedClass,
            })
          }
          // onClick={
          //   (() => navigate("/Assign"),
          //   {
          //     state: {
          //       selectedClass,
          //     },
          //   })
          // }
        >
          Assign activity
        </button>
      </div>
      <div className="overlay" aria-disabled={!isDeleting}>
        <div className="message-box">
          <h1>Are you sure you want to delete this class?</h1>
          <button className="btn" onClick={() => deleteThisClass()}>
            yes
          </button>
          <button className="btn" onClick={() => setIsDeleting(false)}>
            no
          </button>
        </div>
      </div>
    </div>
  );
};

export default ClassDetails;
