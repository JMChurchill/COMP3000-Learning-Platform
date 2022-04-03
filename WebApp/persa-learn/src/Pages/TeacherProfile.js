import React, { useEffect, useState } from "react";
import Class from "../Components/Class";
import { getTeachersClasses } from "../http_Requests/teacherRequests";
import { useNavigate } from "react-router-dom";
import ClassDetails from "../Components/TeacherProfile/ClassDetails";
import AddClass from "../Components/TeacherProfile/AddClass";

const TeacherProfile = () => {
  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState();
  const [classSuccess, setClassSuccess] = useState(false);
  // current right view
  const [addingClass, setAddingClass] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isShowStudents, setIsShowStudents] = useState(false);

  // const [usersName, setUsersName] = useState();

  useEffect(async () => {
    classChanged();
  }, [selectedClass]);

  const classChanged = () => {
    setClassSuccess(!classSuccess);
    setIsUpdating(false);
    setIsSearching(false);
    setIsShowStudents(false);
  };

  useEffect(async () => {
    let data = await getTeachersClasses();
    if (data.hasOwnProperty("data")) {
      setClasses(data.data);
    }
  }, [classSuccess]);

  const flipAddClass = () => {
    setAddingClass(!addingClass);
  };

  return (
    <div className="content-box">
      <h1>Teacher Profile</h1>
      <div className="container">
        <div className="left-box task-box">
          {classes.map((c, i) => {
            let classSelected = false;
            if (selectedClass) {
              if (selectedClass.id === c.classdetailsID) {
                classSelected = true;
              }
            }
            return (
              <Class
                key={c.classdetailsID}
                id={c.classdetailsID}
                name={c.Name}
                yearGroup={c.YearGroup}
                setSelectedClass={setSelectedClass}
                classSelected={classSelected}
              />
            );
          })}
          <div className="bottom-bar">
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
        {addingClass ? (
          <AddClass flipAddClass={flipAddClass} classChanged={classChanged} />
        ) : selectedClass ? (
          <ClassDetails
            setSelectedClass={setSelectedClass}
            selectedClass={selectedClass}
            classID={selectedClass.id}
            name={selectedClass.name}
            yearGroup={selectedClass.yearGroup}
            classChanged={classChanged}
            setIsSearching={setIsSearching}
            isSearching={isSearching}
            setIsUpdating={setIsUpdating}
            isUpdating={isUpdating}
            setIsShowStudents={setIsShowStudents}
            isShowStudents={isShowStudents}
          />
        ) : (
          <div className="right-box vFill">
            <h2>Select a class</h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default TeacherProfile;
