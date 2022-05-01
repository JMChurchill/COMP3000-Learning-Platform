import { StyleSheet, Text, View, Alert } from "react-native";
import React from "react";
import CustomButton from "../../CustomButton/CustomButton";
import colors from "../../../config/colors";
import common from "../../../config/common";
import fonts from "../../../config/fonts";
import { deleteFlashCardRequest } from "../../../httpRequests/flashcardRequests";

const ViewingCard = ({ card, setIsEditing, getCards }) => {
  const deleteCard = async () => {
    // console.log("Deleting card: ", card.CardID);
    // console.log("OK Pressed");
    const data = await deleteFlashCardRequest({ FlashCardID: card.CardID });
    console.log(data);
    if (data.status === "success") {
      await getCards();
    } else alert("Something went wrong, unable to delete card");
  };
  return (
    <View style={styles.cardContainer}>
      <View style={styles.sideContainer}>
        <Text style={fonts.h1}>Front</Text>

        <Text
          style={[fonts.h2, { color: colors.mainText, marginVertical: 10 }]}
        >
          {card.Question}
        </Text>
      </View>
      <View style={styles.sideContainer}>
        <Text style={fonts.h1}>Back</Text>

        <Text
          style={[fonts.h2, { color: colors.mainText, marginVertical: 10 }]}
        >
          {card.Answer}
        </Text>
      </View>
      <CustomButton text={"Edit"} onPress={() => setIsEditing(true)} />
      <CustomButton
        text={"Delete"}
        type={"SECONDARY"}
        onPress={() => {
          Alert.alert("Warning", "Are you sure you want to delete this card?", [
            {
              text: "No",
              style: "cancel",
            },
            { text: "Yes", onPress: () => deleteCard() },
          ]);
        }}
      />
    </View>
  );
};

export default ViewingCard;

const styles = StyleSheet.create({
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
    minHeight: 100,
    // padding: "5%",
    // backgroundColor: colors.cardBackground,
    // borderRadius: common.containerBorderRadius,
    // marginVertical: 10,
    alignItems: "center",
    // borderWidth: 1,
    // borderColor: colors.lightGrey,
  },
});
