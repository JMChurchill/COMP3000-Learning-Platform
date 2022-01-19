import React from "react";
import { Link } from "react-router-dom";

const FlashCards = () => {
  return (
    <div className="content-box">
      <h1>Flash cards</h1>
      <div className="container wide-container center-container">
        <div>
          <div className="title">
            <h2>Choose a Deck</h2>
          </div>
          <div className="flash-card-decks flex-wrap">
            <Link to="/flash-card">
              <div className="flash-card-deck">
                <p>Deck title</p>
              </div>
            </Link>
            <div className="flash-card-deck">
              <p>Deck title</p>
            </div>
            <div className="flash-card-deck">
              <p>Deck title</p>
            </div>
            <div className="flash-card-deck">
              <p>Deck title</p>
            </div>
            <div className="flash-card-deck">
              <p>Deck title</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlashCards;
