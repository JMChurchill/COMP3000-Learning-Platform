import React from "react";
import styles from "./CustomInput.module.css";

const CustomInput = ({ value, password = false, name, setValue }) => {
  return (
    <input
      className={styles.primary}
      // {password?}
      value={value}
      type={password ? "password" : "text"}
      name={name}
      onChange={(e) => setValue(e.target.value)}
    />
  );
};

export default CustomInput;
