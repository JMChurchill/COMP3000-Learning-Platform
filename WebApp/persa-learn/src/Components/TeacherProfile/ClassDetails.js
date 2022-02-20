import React, { useState } from "react";
import { deleteClass } from "../../http_Requests/teacherRequests";
import ListStudents from "./ListStudents";
import SearchStudents from "./SearchStudents";
import UpdateClass from "./UpdateClass";

const ClassDetails = ({
  name = "Name",
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

  const flipIsUpdating = () => {
    setIsUpdating(!isUpdating);
  };

  const flipIsShowStudents = () => {
    setIsShowStudents(!isShowStudents);
  };

  const deleteThisClass = async () => {
    let data = await deleteClass({ classID });
    console.log(data);
    classChanged();
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
        <button className="btn" onClick={() => deleteThisClass()}>
          Delete class
        </button>
        <button className="btn" onClick={() => flipIsShowStudents()}>
          Show all students
        </button>
      </div>
    </div>
  );
};

export default ClassDetails;
