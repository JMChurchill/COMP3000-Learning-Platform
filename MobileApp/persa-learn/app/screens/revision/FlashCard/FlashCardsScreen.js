import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useState, useEffect } from "react";
import fonts from "../../../config/fonts";
import DeckItem from "../../../components/revision/FlashCards/DeckItem";
import colors from "../../../config/colors";
import { Entypo } from "@expo/vector-icons";
import common from "../../../config/common";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { getFlashCardDecksRequest } from "../../../httpRequests/flashcardRequests";
import OptionsOverlay from "../../../components/revision/FlashCards/OptionsOverlay";

export default function FlashCardsScreen() {
  const [decks, setDecks] = useState([]);
  const [selectedDeck, setSelectedDeck] = useState();

  const isFocused = useIsFocused();

  const navigation = useNavigation();

  const createOnPress = () => {
    navigation.navigate("FlashCardCreateDeck");
  };
  const getDecks = async () => {
    const data = await getFlashCardDecksRequest();
    // console.log(data);
    if (data.status === "success") {
      // alert("s");
      // console.log(data.decks);
      setDecks(data.decks);
    }
  };
  useEffect(async () => {
    await getDecks();
  }, [isFocused]);
  return (
    <View style={styles.root}>
      <Text style={fonts.title}>All Flash Cards</Text>
      <ScrollView style={{ width: "100%" }}>
        <View style={styles.DeckContainer}>
          {decks.map((deck) => (
            <DeckItem
              key={deck.DeckID}
              deckID={deck.DeckID}
              deckName={deck.Name}
              setSelectedDeck={setSelectedDeck}
            />
          ))}
          {/* <DeckItem />
          <DeckItem /> */}
          {/* <DeckItem /> */}
          {/* <DeckItem /> */}
        </View>
      </ScrollView>
      <TouchableOpacity
        style={[styles.buttonCreate, common.shadow]}
        onPress={() => {
          createOnPress();
        }}
      >
        <Entypo name="plus" size={50} color="white" />
      </TouchableOpacity>
      {selectedDeck ? (
        <OptionsOverlay
          selectedDeck={selectedDeck}
          close={() => setSelectedDeck(null)}
          getDecks={getDecks}
        />
      ) : (
        <></>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: "center",
  },
  DeckContainer: {
    // flex: 1,
    // borderWidth: 1,
    width: "100%",
    // flexDirection: "row",
    // flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonCreate: {
    position: "absolute",
    bottom: 0,
    right: 0,
    justifyContent: "center",
    alignItems: "center",
    margin: 15,
    borderRadius: 1000,
    height: "10%",
    aspectRatio: 1,
    backgroundColor: colors.primary,
  },
});
