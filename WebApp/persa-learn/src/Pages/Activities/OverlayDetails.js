import React, { useEffect, useState } from "react";
import CustomButton from "../../Components/CustomButton";
import CustomInput from "../../Components/CustomInput";
import { useNavigate } from "react-router-dom";

import { updateFlashCardDecks } from "../../http_Requests/StudentRequests/FlashCardRequests";
import styles from "./OverlayDetails.module.css";

const OverlayDetails = ({
  selectedDeck,
  name = "placeholder",
  numberCards = 0,
  close,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState(selectedDeck.Name);
  const [status, setStatus] = useState({ error: false, message: "" });
  const navigate = useNavigate();

  useEffect(async () => {
    // get number of cards
  }, []);
  const edit = async () => {
    console.log(newName);
    if (newName != null && newName != "") {
      setStatus({ error: false, message: "Name Updated" });
      const data = await updateFlashCardDecks({
        DeckID: selectedDeck.DeckID,
        Name: newName,
      });
      console.log(data);
      if (data.status === "success") {
      }
    } else setStatus({ error: true, message: "Please enter a name" });
  };
  const play = () => {};
  return (
    <div className={styles.overlay}>
      {/* <div className="message-box"> */}
      <div className={styles.message_box}>
        {isEditing ? (
          <>
            <p>Name</p>
            {status.error ? (
              <p className={styles.error_message}>{status.message}</p>
            ) : (
              <p className={styles.success_message}>{status.message}</p>
            )}
            <CustomInput fill={true} setValue={setNewName} value={newName} />
            <CustomButton text={"Edit Deck"} onClick={() => edit()} />
            <CustomButton
              text={"Back"}
              type={2}
              onClick={() => setIsEditing(false)}
            />
          </>
        ) : (
          <>
            {" "}
            <h1>{selectedDeck.Name} Deck</h1>
            <p>Number cards: {numberCards}</p>
            <CustomButton
              text={"Play"}
              onClick={() =>
                navigate("/flash-card", {
                  state: selectedDeck,
                })
              }
            />
            <CustomButton
              text={"Edit"}
              onClick={() => {
                setIsEditing(true);
                setNewName(selectedDeck.Name);
              }}
            />
            <CustomButton
              text={"Edit Cards"}
              onClick={() =>
                navigate("/flash-card/edit", {
                  state: selectedDeck,
                })
              }
            />
            <CustomButton
              text={"Add Card"}
              onClick={() =>
                navigate("/designer_flashcard", {
                  state: selectedDeck,
                })
              }
            />
            <CustomButton text={"Back"} onClick={close} type={2} />
          </>
        )}
      </div>
    </div>
  );
};

export default OverlayDetails;
