import React from "react";
import styles from "./ToolTip.module.css";

const ToolTip = ({ Icon, text, action, id }) => {
  return (
    <div className={styles.tooltip}>
      <Icon onClick={() => action(id)} />
      <span className={styles.tooltiptext}>{text}</span>
    </div>
  );
};

export default ToolTip;
