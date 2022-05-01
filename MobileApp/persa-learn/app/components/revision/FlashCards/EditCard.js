import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import common from "../../../config/common";
import colors from "../../../config/colors";
import fonts from "../../../config/fonts";
import CustomInput from "../../CustomInput/CustomInput";
import { useForm } from "react-hook-form";
import ViewingCard from "./ViewingCard";
import CustomButton from "../../CustomButton/CustomButton";
import EditingCard from "../EditingCard";

const EditCard = ({ card, getCards }) => {
  const [isEditing, setIsEditing] = useState(false);
  if (isEditing) {
    return (
      <EditingCard
        card={card}
        setIsEditing={setIsEditing}
        getCards={getCards}
      />
    );
  } else {
    return (
      <ViewingCard
        card={card}
        setIsEditing={setIsEditing}
        getCards={getCards}
      />
    );
  }
};

export default EditCard;

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
