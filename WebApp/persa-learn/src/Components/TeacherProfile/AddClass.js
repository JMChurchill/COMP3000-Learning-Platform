import React, { useState } from "react";
import { createClass } from "../../http_Requests/teacherRequests";

const AddClass = ({ flipAddClass, classChanged }) => {
  const [className, setClassName] = useState();
  const [yearGroup, setYearGroup] = useState();
  const addToClass = async (e) => {
    e.preventDefault();
    let details = { name: className, year: yearGroup };
    let data = await createClass(details);
    console.log(data);
    if (data.status === "success") {
      console.log("class created successfully");
      classChanged();
      flipAddClass();
    } else {
      console.log("failed");
    }
  };
  return (
    <div className="right-box vFill">
      <button className="btn" onClick={() => flipAddClass()}>
        X
      </button>
      <h2>Add class</h2>
      <form action="" onSubmit={addToClass}>
        <label htmlFor="name">Class Name</label>
        <input
          type="name"
          name="name"
          onChange={(e) => setClassName(e.target.value)}
        />
        <label htmlFor="yearGroup">Year group</label>
        <input
          type="yearGroup"
          name="yearGroup"
          onChange={(e) => setYearGroup(e.target.value)}
        />
        <input type="submit" className="btn" value="Add Class" />
      </form>
    </div>
  );
};

export default AddClass;
