import React, { useState } from "react";
import CustomButton from "../../Components/CustomButton";
import CustomInput from "../../Components/CustomInput";
import OverlayConfirm from "../../Components/OverlayConfirm";
import { editPasswordTeachers } from "../../http_Requests/teacherRequests";
import styles from "./OverlayPassword.module.css";

const OverlayPassword = ({ close }) => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isChanged, setIsChanged] = useState(false);

  const changePassword = async () => {
    if (newPassword === confirmPassword) {
      const data = await editPasswordTeachers({
        oPassword: oldPassword,
        nPassword: newPassword,
      });
      if (data.status === "success") {
        setIsChanged(true);
      }
    } else alert("New passwords do not match");
  };
  return (
    <div className={styles.overlay}>
      <div className={styles.message_box}>
        <h2>Change Password</h2>
        <h3>Current Password</h3>
        <CustomInput
          setValue={setOldPassword}
          value={oldPassword}
          password={true}
        />
        <h3>New Password</h3>
        <CustomInput
          setValue={setNewPassword}
          value={newPassword}
          password={true}
        />
        <h3>Confirm New Password</h3>
        <CustomInput
          setValue={setConfirmPassword}
          value={confirmPassword}
          password={true}
        />
        <div>
          <CustomButton text={"Confirm"} onClick={changePassword} />
          <CustomButton text={"Back"} type={2} onClick={close} />
        </div>
      </div>
      {isChanged ? (
        <OverlayConfirm
          message={"Password Changed"}
          type={2}
          yes={() => {
            setIsChanged(false);
            close();
          }}
        />
      ) : (
        <></>
      )}
    </div>
  );
};

export default OverlayPassword;
