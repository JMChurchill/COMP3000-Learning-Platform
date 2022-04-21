import React from "react";
import { useNavigate } from "react-router-dom";
import { deleteThemeAdmin } from "../../../http_Requests/StudentRequests/ItemRequests";
import CustomButton from "../../CustomButton";
import styles from "./OverlayDetails.module.css";

const OverlayDetails = ({
  id,
  name,
  details,
  primaryColor,
  backgroundColor,
  btnTextColor,
  isDark,
  cost,
  requiredLevel,
  close,
}) => {
  const deleteTheme = async () => {
    const data = await deleteThemeAdmin({ ThemeID: id });
    console.log(data);
    close();
  };

  const navigate = useNavigate();

  return (
    <div className={styles.overlay}>
      <div className={styles.message_box}>
        <h1>{name}</h1>
        <p>{details}</p>
        <div className={styles.theme_container}>
          <div
            className={styles.primary_color}
            style={{ backgroundColor: primaryColor }}
          >
            <div
              className={styles.background_color}
              style={{ backgroundColor: backgroundColor }}
            >
              <p style={isDark ? { color: "#c9d1d9" } : { color: "black" }}>
                abc
              </p>
            </div>
          </div>
        </div>
        <p>Cost {cost}</p>
        <p>Required Level {requiredLevel}</p>
        <CustomButton
          text={"Edit theme"}
          onClick={() =>
            navigate("/themes/edit", {
              state: {
                ThemeID: id,
              },
            })
          }
        />
        <CustomButton text={"Delete theme"} onClick={deleteTheme} />
        <CustomButton text={"Back"} type={2} onClick={close} />
      </div>
    </div>
  );
};

export default OverlayDetails;
