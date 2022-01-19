import React from "react";

const FlashCard = () => {
  return (
    <div className="content-box">
      <h1>Flash Card!</h1>
      <div className="container wide-container center-container">
        <div>
          <div className="title">
            <h2>Cards Remaining: </h2>
          </div>
          <div className="flash-card">
            <p>Question</p>
          </div>
          <button className="btn">Flip card</button>
        </div>
      </div>
    </div>
  );
};

export default FlashCard;
