import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React from "react";
import fonts from "../../../config/fonts";
import DeckItem from "../../../components/revision/FlashCards/DeckItem";
import colors from "../../../config/colors";
import { Entypo } from "@expo/vector-icons";
import common from "../../../config/common";
import { useNavigation } from "@react-navigation/native";

export default function FlashCardsScreen() {
  const navigation = useNavigation();

  const createOnPress = () => {
    navigation.navigate("FlashCardCreateDeck");
  };
  return (
    <View style={styles.root}>
      <Text style={fonts.title}>All Flash Cards</Text>
      <ScrollView style={{ width: "100%" }}>
        <View style={styles.DeckContainer}>
          <DeckItem />
          <DeckItem />
          <DeckItem />
          <DeckItem />
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
