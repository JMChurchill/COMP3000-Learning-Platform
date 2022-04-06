import React from "react";
import CustomButton from "./CustomButton";
import styles from "./OverlayConfirm.module.css";
const OverlayConfirm = ({ message, yes, no }) => {
  return (
    <div className={styles.overlay}>
      {/* <div className="message-box"> */}
      <div className={styles.message_box}>
        <h1>{message}</h1>
        {/* <button className="btn" onClick={yes}>
          yes
        </button>
        <button className="btn" onClick={no}>
          no
        </button> */}
        <CustomButton text={"Yes"} onClick={yes} />
        <CustomButton text={"No"} onClick={no} type={2} />
      </div>
    </div>
  );
};

export default OverlayConfirm;
