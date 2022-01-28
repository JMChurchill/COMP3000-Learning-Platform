import React from "react";

const FlashcardDesigner = () => {
  return (
    <div className="content-box">
      <h1>Flash Card!</h1>
      <div className="container wide-container center-container">
        <div>
          <div className="title">
            <h2>Module Name</h2>
          </div>
          <div className="card-designer">
            <form action="">
              <div>
                <h2>Front</h2>
                <input placeholder="add word"></input>
              </div>
              <div>
                <h2>Back</h2>
                <input placeholder="Add definition"></input>
              </div>
            </form>
          </div>
          {/* <Flashcard
            question={currentCard.question}
            answer={currentCard.answer}
          /> */}
          <div className="rows center-container">
            <button className="btn">delete card</button>
            <button className="btn">create card</button>
          </div>
          {/* {count < tempFlashcardData.length ? (
            <button onClick={nextCard} className="btn">
              Next Card
            </button>
          ) : (
            <button onClick={done} className="btn">
              Done
            </button>
          )} */}
        </div>
      </div>
    </div>
  );
};

export default FlashcardDesigner;
