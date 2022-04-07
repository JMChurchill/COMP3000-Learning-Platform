import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CustomButton from "../../Components/CustomButton";
import CustomInput from "../../Components/CustomInput";
import AlertOverlay from "../../Components/Overlays/AlertOverlay";
import {
  createFlashCardDecks,
  getFlashCardDecks,
} from "../../http_Requests/StudentRequests/FlashCardRequests";
import styles from "./FlashCards.module.css";
import OverlayDetails from "./OverlayDetails";
const FlashCards = () => {
  const [isAdding, setIsAdding] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const [isDeckSelected, setIsDeckSelected] = useState(false);

  const [deckName, setDeckName] = useState();
  const [decks, setDecks] = useState([]);
  const [selectedDeck, setSelectedDeck] = useState();

  const createDeck = async () => {
    if (deckName != null) {
      console.log(deckName);
      const data = await createFlashCardDecks({ Name: deckName });
      console.log(data);
      if (data.status === "success") {
        setIsAdded(true);
        setIsAdding(false);
      }
    } else alert("Enter a deck name");
  };

  useEffect(async () => {
    const data = await getFlashCardDecks();
    console.log(data);
    setDecks(data.decks);
  }, [isAdded]);
  return (
    <div className="content-box">
      <h1>Flash cards</h1>
      <div className={styles.container}>
        <div className={styles.title_container}>
          <h2>Choose a Deck</h2>
        </div>
        {isAdding ? (
          <>
            <div className={styles.new_deck_container}>
              <p>Name</p>
              <CustomInput setValue={setDeckName} />
            </div>
            <CustomButton text={"Create"} onClick={() => createDeck()} />
          </>
        ) : (
          <div className={styles.deck_container}>
            {decks.map((deck) => (
              <div
                className={styles.deck}
                key={deck.DeckID}
                onClick={() => {
                  setSelectedDeck(deck);
                  console.log(selectedDeck);
                  setIsDeckSelected(true);
                }}
              >
                <p>{deck.Name}</p>
              </div>
            ))}
            {/* <Link to="/flash-card">
              <div className={styles.deck}>
                <p>Deck title</p>
              </div>
            </Link>
            <div className={styles.deck}>
              <p>Deck title</p>
            </div>
            <div className={styles.deck}>
              <p>Deck title</p>
            </div>
            <div className={styles.deck}>
              <p>Deck title</p>
            </div>
            <div className={styles.deck}>
              <p>Deck title</p>
            </div> */}
          </div>
        )}
        <CustomButton
          text={isAdding ? "Back" : "Add Deck"}
          type={isAdding ? 2 : 1}
          onClick={() => setIsAdding(!isAdding)}
        />
      </div>
      {/* </div> */}
      {isAdded ? (
        <AlertOverlay
          message={"New deck Created"}
          ok={() => setIsAdded(false)}
        />
      ) : (
        <></>
      )}
      {isDeckSelected ? (
        <OverlayDetails
          selectedDeck={selectedDeck}
          close={() => setIsDeckSelected(false)}
        />
      ) : (
        <></>
      )}
      {/* <OverlayDetails selectedDeck={selectedDeck} /> */}
    </div>
  );
};

export default FlashCards;
