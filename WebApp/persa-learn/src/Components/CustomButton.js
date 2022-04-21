import React from "react";
import styles from "./CustomButton.module.css";

import { MdAdd } from "react-icons/md";
const CustomButton = ({
  text,
  type = 1,
  onClick,
  fill = false,
  floating = false,
}) => {
  if (type === 3) {
    return (
      <div
        className={styles.special}
        style={
          floating
            ? { position: "absolute", right: 0, bottom: 0 }
            : { justifySelf: "end" }
        }
        onClick={() => onClick()}
      >
        <div className={styles.circle}>
          <MdAdd />
        </div>
        <p>{text}</p>
        {/* <p>Lorem ipsum dolor sit amet.</p> */}
      </div>
    );
  } else if (type === 4) {
    return (
      <button
        className={styles.icon}
        style={fill ? { width: "100%", minWidth: 0, maxWidth: "12rem" } : {}}
        onClick={() => onClick()}
      >
        {text}
      </button>
    );
  }
  return (
    <button
      className={type == 1 ? styles.primary : styles.secondary}
      style={fill ? { width: "100%", minWidth: 0, maxWidth: "12rem" } : {}}
      onClick={() => onClick()}
    >
      {text}
    </button>
  );
};

export default CustomButton;
