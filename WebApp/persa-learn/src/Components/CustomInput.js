import React from "react";
import styles from "./CustomInput.module.css";

const CustomInput = ({
  value,
  password = false,
  name,
  setValue,
  placeholder,
  fill = false,
}) => {
  return (
    <input
      className={styles.primary}
      placeholder={placeholder}
      style={fill ? { margin: "0.5rem 0", width: "100%" } : {}}
      // {password?}
      value={value}
      type={password ? "password" : "text"}
      name={name}
      onChange={(e) => setValue(e.target.value)}
    />
  );
};

export default CustomInput;
