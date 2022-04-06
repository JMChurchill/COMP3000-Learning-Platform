import React from "react";
import CustomButton from "../CustomButton";
import styles from "./OverlayAddModule.module.css";

const OverlayAddModule = ({
  onChange,
  isAddModule,
  moduleCreated,
  addModule,
  setIsAddModule,
  setModuleCreated,
}) => {
  return (
    <div className={styles.overlay} aria-disabled={!isAddModule}>
      <div className={styles.message_box}>
        {moduleCreated ? (
          <h1>Module created successfully</h1>
        ) : (
          <>
            <h1>Add a new module</h1>
            <input
              type="text"
              placeholder="module name"
              // onChange={(e) => setNewModule(e.target.value)}
              onChange={onChange}
            />
            <CustomButton text={"Ok"} onClick={() => addModule()} />
          </>
        )}
        <CustomButton
          text={"Back"}
          type={2}
          onClick={() => {
            setIsAddModule(false);
            setModuleCreated(false);
          }}
        />
      </div>
    </div>
  );
};

export default OverlayAddModule;
