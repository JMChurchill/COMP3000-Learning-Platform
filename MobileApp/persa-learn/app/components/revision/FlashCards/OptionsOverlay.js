import { StyleSheet, Text, View, Alert } from "react-native";
import React from "react";
import common from "../../../config/common";
import fonts from "../../../config/fonts";
import CustomButton from "../../CustomButton/CustomButton";
import { useNavigation } from "@react-navigation/native";
import { deleteFlashCardDeckRequest } from "../../../httpRequests/flashcardRequests";

const OptionsOverlay = ({ selectedDeck, close, getDecks }) => {
  const navigation = useNavigation();

  const play = () => {
    navigation.navigate("FlashCardPlay", { deckID: selectedDeck.deckID });
  };
  const editName = () => {
    navigation.navigate("DeckEdit", {
      deckID: selectedDeck.deckID,
      deckName: selectedDeck.deckName,
    });
  };
  const editCards = () => {
    navigation.navigate("CardsEdit", {
      deckID: selectedDeck.deckID,
      deckName: selectedDeck.deckName,
    });
  };
  const remove = async () => {
    const data = await deleteFlashCardDeckRequest({
      DeckID: selectedDeck.deckID,
    });
    console.log(data);
    if (data.status === "success") {
      //refresh page
      getDecks();
      close();
    } else alert("Unable to delete the deck");
  };
  return (
    <View style={styles.overlay}>
      <View style={styles.overlayWindow}>
        <Text style={fonts.title}>{selectedDeck.deckName}</Text>

        <CustomButton
          // style={{ marginHorizontal: 10 }}
          text="Play"
          onPress={play}
        />
        <CustomButton
          // style={{ marginHorizontal: 10 }}
          text="Edit Name"
          onPress={editName}
        />
        <CustomButton
          // style={{ marginHorizontal: 10 }}
          text="Edit Cards"
          onPress={editCards}
        />
        <CustomButton
          // style={{ marginHorizontal: 10 }}
          text="Delete Deck"
          onPress={() => {
            Alert.alert(
              "Warning",
              "Are you sure you want to delete this deck? (All cards will be lost)",
              [
                {
                  text: "No",
                  style: "cancel",
                },
                {
                  text: "Yes",
                  onPress: () => {
                    remove();
                  },
                },
              ]
            );
          }}
        />
        <CustomButton
          // style={{ marginHorizontal: 10 }}
          text="Back"
          type="SECONDARY"
          onPress={close}
        />
      </View>
    </View>
  );
};

export default OptionsOverlay;

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    flex: 1,
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    alignItems: "center",
    justifyContent: "center",
  },
  overlayWindow: {
    width: "90%",
    minHeight: "20%",
    padding: 20,
    backgroundColor: "#fff",
    opacity: 1.5,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: common.containerBorderRadius,
  },
});
