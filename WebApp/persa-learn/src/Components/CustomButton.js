import React from "react";
import styles from "./CustomButton.module.css";

import { MdAdd } from "react-icons/md";
const CustomButton = ({ text, type = 1, onClick }) => {
  if (type === 3) {
    return (
      <div className={styles.special} onClick={() => onClick()}>
        <div className={styles.circle}>
          <MdAdd />
        </div>
        <p>{text}</p>
        {/* <p>Lorem ipsum dolor sit amet.</p> */}
      </div>
    );
  }
  return (
    <button
      className={type == 1 ? styles.primary : styles.secondary}
      onClick={() => onClick()}
    >
      {text}
    </button>
  );
};

export default CustomButton;
