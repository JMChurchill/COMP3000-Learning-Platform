import React, { useState } from "react";
import CustomInput from "../CustomInput";
import styles from "./NewOption.module.css";
const NewOption = ({
  opID,
  updateOption,
  correctAns,
  updateCorrectAns,
  value,
}) => {
  const [option, setOption] = useState(value);

  return (
    // <div className="new-option">
    <div className={styles.new_option}>
      {/* <input
        placeholder="enter option"
        onChange={(e) => {
          setOption(e.target.value);
          updateOption(opID, e.target.value);
        }}
      /> */}
      <CustomInput
        placeholder={"Option"}
        value={option}
        setValue={setOption}
        updateAllValues={updateOption}
        OptionID={opID}
        fill={true}
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
