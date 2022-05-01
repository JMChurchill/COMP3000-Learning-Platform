import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import fonts from "../../../config/fonts";
import common from "../../../config/common";
import { useNavigation } from "@react-navigation/native";

export default function DeckItem({ deckName, deckID, setSelectedDeck }) {
  console.log("id", deckID);
  // const navigation = useNavigation();

  const deckOnPress = () => {
    setSelectedDeck({ deckName, deckID });
    // navigation.navigate("FlashCardPlay", { deckID });
  };
  return (
    <TouchableOpacity
      style={[styles.container, common.shadow]}
      onPress={() => {
        deckOnPress();
      }}
    >
      <Text style={[fonts.h1, { fontWeight: "bold", color: "black" }]}>
        {deckName}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "yellow",
    // flex: 2,
    width: "90%",
    // minHeight: "10%",
    aspectRatio: 1 / 0.5,
    margin: "2%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: common.containerBorderRadius,
  },
});
