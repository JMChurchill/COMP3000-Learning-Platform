import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import CustomButton from "../../../Components/CustomButton";
import { getFlashCards } from "../../../http_Requests/StudentRequests/FlashCardRequests";
import styles from "./EditCardsInDeck.module.css";

const EditCardsInDeck = () => {
  const { state } = useLocation();
  const [deck, setDeck] = useState([]);
  console.log("state: ", state);

  //   const deck = [
  //     { id: 1, question: "1+1", answer: "2" },
  //     { id: 2, question: "1+1", answer: "2" },
  //     { id: 3, question: "1+1", answer: "2" },
  //   ];
  useEffect(async () => {
    const data = await getFlashCards(state);
    console.log(data);
    setDeck(data.flashCards);
    // setCurrentCard(deck[0]);
  }, []);
  return (
    <div className="content-box">
      <h1>Flash cards</h1>
      <div className={styles.container}>
        <div className={styles.title_container}>
          <h2>Choose a Deck</h2>
        </div>
        <div className={styles.cards_container}>
          {deck.map((card) => (
            <div className={styles.card} key={card.id}>
              <div className={styles.front}>
                <p>Question</p>
                <p>{card.Question}</p>
              </div>
              <div className={styles.back}>
                <p>Answer</p>
                <p>{card.Answer}</p>
              </div>
              <div className={styles.options}>
                <CustomButton text={"edit"} fill={true} />
                <CustomButton text={"Delete"} fill={true} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EditCardsInDeck;
