import React from "react";
import styles from "./Progressbar.module.css";
const Progressbar = () => {
  return (
    <div className={styles.progressbar}>
      <div className={styles.bar_fill}></div>
    </div>
  );
};

export default Progressbar;
