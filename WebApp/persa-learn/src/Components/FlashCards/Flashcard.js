import React, { useState } from "react";
import styles from "./Flashcard.module.css";

const Flashcard = ({ question = "Question", answer = "Answer" }) => {
  const [flipped, setFlip] = useState(false);
  const flip = () => {
    setFlip(!flipped);
    console.log(flipped);
  };

  return (
    // <div onClick={flip} className={"flash-card" + (flipped ? " flipped" : "")}>
    <div onClick={flip} className={styles.flash_card}>
      <div
        className={styles.front}
        style={flipped ? { transform: "rotateY(180deg)" } : {}}
      >
        <p>{question}</p>
      </div>
      <div
        className={styles.back}
        // style={flipped ? { transform: "rotateY(0deg)", zIndex: 3 } : {}}
        style={
          flipped
            ? { transform: "rotateY(0deg)", transform: "translateZ(1rem)" }
            : {}
        }
      >
        <p>{answer}</p>
      </div>
    </div>
  );
};

export default Flashcard;
