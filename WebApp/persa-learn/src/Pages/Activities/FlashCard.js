import React, { useState } from "react";
import Flashcard from "../../Components/Flashcard";

import tempFlashcardData from "../../assets/tempFlashcardData.json";

const FlashCard = () => {
  const [currentCard, setCurrentCard] = useState(tempFlashcardData[0]);
  const [count, setCount] = useState(1);
  const nextCard = () => {
    console.log(count);
    setCount(count + 1);
    if (count < tempFlashcardData.length) {
      setCurrentCard(tempFlashcardData[count]);
      console.log(count, currentCard);
    } else {
      alert("done");
    }
  };
  const done = () => {
    alert("done");
  };
  return (
    <div className="content-box">
      <h1>Flash Card!</h1>
      <div className="container wide-container center-container">
        <div>
          <div className="title">
            <h2>Cards Remaining: </h2>
          </div>
          <Flashcard
            question={currentCard.question}
            answer={currentCard.answer}
          />
          <button className="btn">Flip card</button>
          {count < tempFlashcardData.length ? (
            <button onClick={nextCard} className="btn">
              Next Card
            </button>
          ) : (
            <button onClick={done} className="btn">
              Done
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default FlashCard;
