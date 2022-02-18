import React from "react";
import { useNavigate } from "react-router-dom";

const ClassItem = ({ id, name, firstname, lastname, yearGroup }) => {
  const navigate = useNavigate();

  const getClassMates = (id) => {
    console.log("class id: ", id);
  };
  return (
    <div
      key={id}
      id={id}
      className="class-item"
      onClick={() =>
        navigate("/leaderboard", {
          state: {
            classID: id,
          },
        })
      }
    >
      <p>{name}</p>
      <p>{`Teacher: ${firstname} ${lastname}`}</p>
      <p>Year: {yearGroup}</p>
    </div>
  );
};

export default ClassItem;
