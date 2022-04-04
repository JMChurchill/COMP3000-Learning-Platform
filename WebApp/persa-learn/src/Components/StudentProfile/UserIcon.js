import React from "react";
import styles from "./UserIcon.module.css";

const UserIcon = ({ xp, studentIcon }) => {
  return (
    <div className={styles.user_icon}>
      <img src={studentIcon} alt="user icon" height="100px" />
      <div className={styles.xp}>
        <p>{xp}xp</p>
      </div>
    </div>
  );
};

export default UserIcon;
