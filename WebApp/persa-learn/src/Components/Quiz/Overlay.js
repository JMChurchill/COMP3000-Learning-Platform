import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import CustomButton from "../CustomButton";
import LevelProgressbar from "./LevelProgressbar";
import styles from "./Overlay.module.css";
import Rating from "./Rating";

const Overlay = ({
  quizID,
  score,
  answers,
  level,
  earnedXp,
  earnedCoins,
  totalXp,
  remainingXp,
}) => {
  const navigate = useNavigate();

  const [isRating, setIsRating] = useState(false);

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
        <LevelProgressbar
          earnedXp={earnedXp}
          totalXp={totalXp}
          remainingXp={remainingXp}
        />
        <CustomButton
          type={1}
          text={"Done"}
          onClick={() => setIsRating(true)}
        />
        <CustomButton
          type={2}
          text={"Go To Shop"}
          onClick={() => navigate("/shop", {})}
        />
        {isRating ? <Rating quizID={quizID} /> : <></>}
      </div>
    </div>
  );
};

export default Overlay;
