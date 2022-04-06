import React, { useState } from "react";
import styles from "./NewOption.module.css";
const NewOption = ({ opID, updateOption, correctAns, updateCorrectAns }) => {
  const [option, setOption] = useState("");

  return (
    // <div className="new-option">
    <div className={styles.new_option}>
      <input
        placeholder="enter option"
        onChange={(e) => {
          setOption(e.target.value);
          updateOption(opID, e.target.value);
        }}
      />
      {/* act as tick box */}
      <div
        // className="check-box"
        className={styles.check_box}
        aria-selected={correctAns}
        onClick={() => {
          updateCorrectAns(opID);
        }}
      ></div>
    </div>
  );
};

export default NewOption;
