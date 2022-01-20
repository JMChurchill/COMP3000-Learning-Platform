import React, { useState } from "react";

const Flashcard = ({ question = "Question", answer = "Answer" }) => {
  const [flipped, setFlip] = useState(false);
  const flip = () => {
    setFlip(!flipped);
    console.log(flipped);
  };
  return (
    <div onClick={flip} className={"flash-card" + (flipped ? " flipped" : "")}>
      <div className="front">
        <p>{question}</p>
      </div>
      <div className="back">
        <p>{answer}</p>
      </div>
    </div>
  );
};

export default Flashcard;
