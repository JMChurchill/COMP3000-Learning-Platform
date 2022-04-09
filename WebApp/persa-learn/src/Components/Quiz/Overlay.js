import React from "react";
import { useNavigate } from "react-router-dom";
import CustomButton from "../CustomButton";
import LevelProgressbar from "./LevelProgressbar";
import styles from "./Overlay.module.css";

const Overlay = ({
  score,
  answers,
  level,
  earnedXp,
  earnedCoins,
  totalXp,
  remainingXp,
}) => {
  const navigate = useNavigate();

  return (
    <div className={styles.overlay}>
      <div className={styles.message_box}>
        <h1>Completed</h1>
        {answers != null ? (
          <h2>
            {score}/{answers.length}
          </h2>
        ) : (
          <></>
        )}
        {/* <h2>
          {score}/{answers.length}
        </h2> */}
        <div className={styles.level}>
          <h2>Lv{level}</h2>
        </div>
        <div className={styles.row}>
          <div className={styles.earned}>
            <p>+{earnedXp}</p>
            <p>xp earned</p>
          </div>
          <div className={styles.earned}>
            <p>+{earnedCoins}</p>
            <p>coins earned</p>
          </div>
        </div>
        {/* TODO: add level progress */}
        <LevelProgressbar
          earnedXp={earnedXp}
          totalXp={totalXp}
          remainingXp={remainingXp}
        />
        <CustomButton
          type={1}
          text={"Done"}
          onClick={() => navigate("/profile_student", {})}
        />
        <CustomButton
          type={2}
          text={"Go To Shop"}
          onClick={() => console.log("going to shop")}
        />
      </div>
    </div>
  );
};

export default Overlay;
