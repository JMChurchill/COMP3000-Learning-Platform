import React, { useState } from "react";

const NewOption = ({ opID, updateOption, correctAns, updateCorrectAns }) => {
  const [option, setOption] = useState("");

  return (
    <div className="new-option">
      <input
        placeholder="enter option"
        onChange={(e) => {
          setOption(e.target.value);
          updateOption(opID, e.target.value);
        }}
      ></input>
      {/* act as tick box */}
      <div
        className="check-box"
        aria-selected={correctAns}
        onClick={() => {
          updateCorrectAns(opID);
        }}
      ></div>
    </div>
  );
};

export default NewOption;
