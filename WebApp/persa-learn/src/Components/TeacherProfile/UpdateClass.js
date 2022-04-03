import React, { useState } from "react";
import { updateClass } from "../../http_Requests/teacherRequests";

const UpdateClass = ({
  selectedClass,
  flipIsUpdating,
  classChanged,
  classID,
}) => {
  const [className, setClassName] = useState(selectedClass.name);
  const [yearGroup, setYearGroup] = useState(selectedClass.yearGroup);

  const updateTheClass = async (e) => {
    e.preventDefault();
    let details = { name: className, year: yearGroup, classID: classID };
    let data = await updateClass(details);

    if (data.status === "success") {
      console.log("class updated successfully");
      classChanged();
      flipIsUpdating();
    } else {
      alert("Unable to update class");
    }
  };
  return (
    <div className="right-box vFill">
      <button className="btn" onClick={() => flipIsUpdating()}>
        X
      </button>
      <h2>Updating class</h2>
      <form action="" onSubmit={updateTheClass}>
        <label htmlFor="name">Class Name</label>
        <input
          type="name"
          name="name"
          value={className}
          onChange={(e) => setClassName(e.target.value)}
        />
        <label htmlFor="yearGroup">Year group</label>
        <input
          type="yearGroup"
          name="yearGroup"
          value={yearGroup}
          onChange={(e) => setYearGroup(e.target.value)}
        />
        <input type="submit" className="btn" value="Add Class" />
      </form>
    </div>
  );
};

export default UpdateClass;
