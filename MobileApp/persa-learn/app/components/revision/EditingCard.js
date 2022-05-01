import { StyleSheet, Text, View } from "react-native";
import React from "react";
import colors from "../../config/colors";
import common from "../../config/common";
import fonts from "../../config/fonts";
import CustomInput from "../CustomInput/CustomInput";
import CustomButton from "../CustomButton/CustomButton";
import { useForm } from "react-hook-form";
import { updateFlashCardRequest } from "../../httpRequests/flashcardRequests";

const EditingCard = ({ card, setIsEditing, getCards }) => {
  const { control, handleSubmit, watch } = useForm();

  const update = async (credentials) => {
    // console.log(credentials);
    // console.log(card.CardID);
    const data = await updateFlashCardRequest({
      FlashCardID: card.CardID,
      Question: credentials.front,
      Answer: credentials.back,
    });
    console.log(data);
    if (data.status === "success") {
      getCards();
      setIsEditing(false);
    } else {
      alert("Unable to edit card please try again");
    }
  };

  return (
    <View key={card.CardID} style={[styles.cardContainer, common.shadow]}>
      <View
        style={[
          styles.sideContainer,
          // common.shadow
        ]}
      >
        <Text style={fonts.h1}>Front</Text>
        <CustomInput
          name="front"
          placeholder="Add front text"
          control={control}
          rules={{ required: "Front text is required" }}
          large={true}
          fSize={20}
          value={card.Question}
        />
      </View>
      <View
        style={[
          styles.sideContainer,
          // common.shadow
        ]}
      >
        <Text style={fonts.h1}>Back</Text>
        <CustomInput
          name="back"
          placeholder="Add back text"
          control={control}
          rules={{ required: "Back text is required" }}
          large={true}
          fSize={20}
          value={card.Answer}
        />
      </View>
      <CustomButton text={"Done"} onPress={handleSubmit(update)} />
      {/* <CustomButton text={"Done"} onPress={() => setIsEditing(false)} /> */}
    </View>
  );
};

export default EditingCard;

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
    minHeight: 200,
    // padding: "5%",
    // backgroundColor: colors.cardBackground,
    // borderRadius: common.containerBorderRadius,
    // marginVertical: 10,
    alignItems: "center",
  },
});
