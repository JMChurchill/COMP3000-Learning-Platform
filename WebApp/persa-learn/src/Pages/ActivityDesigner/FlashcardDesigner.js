import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import CustomButton from "../../Components/CustomButton";
import CustomInput from "../../Components/CustomInput";
import { createFlashCard } from "../../http_Requests/StudentRequests/FlashCardRequests";
import styles from "./FlashcardDesigner.module.css";
const FlashcardDesigner = () => {
  const [question, setQuestion] = useState();
  const [answer, setAnswer] = useState();

  const { state } = useLocation();
  const navigate = useNavigate();

  console.log(state);
  const createCard = async () => {
    console.log("front: ", question, " Back: ", answer);
    if (question != null && answer != null && question != "" && answer != "") {
      console.log("ok");
      const data = await createFlashCard({
        DeckID: state.DeckID,
        Question: question,
        Answer: answer,
      });
      console.log(data);
    }
  };
  return (
    <div className="content-box">
      <h1>Flash Card!</h1>
      {/* <div className="container wide-container center-container"> */}
      <div className={styles.container}>
        {/* <div> */}
        {/* <div className="title"> */}
        <div className={styles.title_container}>
          <h2>Deck Name: {state.Name}</h2>
        </div>
        {/* <div className="card-designer"> */}
        <div className={styles.card_design_container}>
          {/* <form action=""> */}
          <div className={styles.row}>
            <div className={styles.input_container}>
              <h2>Front</h2>
              <CustomInput placeholder={"add word"} setValue={setQuestion} />
            </div>
            <div className={styles.input_container}>
              <h2>Back</h2>
              <CustomInput placeholder={"add word"} setValue={setAnswer} />
            </div>
          </div>
          {/* </form> */}
        </div>
        {/* <Flashcard
            question={currentCard.question}
            answer={currentCard.answer}
          /> */}
        <div className="rows center-container">
          {/* <button className="btn">delete card</button>
          <button className="btn">create card</button> */}
          <CustomButton text={"Create Card"} onClick={() => createCard()} />
          <CustomButton
            text={"Back"}
            type={2}
            // onClick={() => console.log("go back")}
            onClick={() => navigate("/flash-cards", {})}
          />
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
        {/* </div> */}
      </div>
    </div>
  );
};

export default FlashcardDesigner;
