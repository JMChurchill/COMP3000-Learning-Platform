import React from "react";
import styles from "./ThemeCurrent.module.css";

const ThemeCurrent = ({}) => {
  return (
    <div className={styles.theme_container}>
      <div className={styles.primary_color}>
        <div className={styles.background_color}>
          <p className={styles.text_color}>abc</p>
        </div>
      </div>
    </div>
  );
};

export default ThemeCurrent;
