import { StyleSheet, Text, View, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import CustomInput from "../../../components/CustomInput/CustomInput";
import CustomButton from "../../../components/CustomButton/CustomButton";
import colors from "../../../config/colors";
import common from "../../../config/common";
import fonts from "../../../config/fonts";
import { useForm } from "react-hook-form";
import {
  getFlashCardDecksRequest,
  getFlashCardsRequest,
} from "../../../httpRequests/flashcardRequests";
import EditCard from "../../../components/revision/FlashCards/EditCard";
import { useIsFocused } from "@react-navigation/native";

const EditCardsScreen = ({ route, navigation }) => {
  const { deckID, deckName } = route.params;
  const [cards, setCards] = useState([]);
  // console.log(deckName);

  const { control, handleSubmit, watch } = useForm();

  const update = async (changes) => {
    console.log(changes);
  };
  // const navigation = useNavigation();
  const isFocused = useIsFocused();

  const getCards = async () => {
    const data = await getFlashCardsRequest({ deckID });
    console.log(data);
    setCards(data.flashCards);
  };

  useEffect(async () => {
    await getCards();
  }, [isFocused]);
  return (
    <ScrollView>
      <View style={styles.root}>
        <Text style={fonts.title}>Edit {deckName} Deck</Text>
        {cards.map((card) => (
          <EditCard card={card} getCards={getCards} />
        ))}

        <CustomButton
          text={"Add Card"}
          onPress={() =>
            navigation.navigate("FlashCardCreate", { deckID, deckName })
          }
        />
        <CustomButton
          text={"Back"}
          type={"SECONDARY"}
          onPress={() => navigation.navigate("FlashCards")}
        />
      </View>
    </ScrollView>
  );
};

export default EditCardsScreen;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: "center",
    padding: "5%",
    // borderWidth: 1,
    // borderColor: "orange",
  },
  cardContainer: {
    width: "100%",
    backgroundColor: colors.cardBackground,
    padding: 10,
    backgroundColor: colors.cardBackground,
    borderRadius: common.containerBorderRadius,
    marginVertical: 10,
    alignItems: "center",
  },
  sideContainer: {
    // borderWidth: 1,
    width: "100%",
    minHeight: 200,
    // padding: "5%",
    // backgroundColor: colors.cardBackground,
    // borderRadius: common.containerBorderRadius,
    // marginVertical: 10,
    alignItems: "center",
  },
});
