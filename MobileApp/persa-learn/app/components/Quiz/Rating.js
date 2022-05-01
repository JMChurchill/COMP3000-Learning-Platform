import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import common from "../../config/common";
import colors from "../../config/colors";
import fonts from "../../config/fonts";
import Rate from "../Rate";
import CustomButton from "../CustomButton/CustomButton";
import { useNavigation } from "@react-navigation/native";
import { rateQuizRequest } from "../../httpRequests/ratingRequests";

const Rating = ({ quizID, close }) => {
  const [rating, setRating] = useState(0);

  const navigation = useNavigation();

  const submitRating = async () => {
    const data = await rateQuizRequest({ quizID, rating });
    close();
    navigation.navigate("ProfilePage");
  };
  return (
    <View style={styles.overlay}>
      <View style={styles.overlayWindow}>
        <Text style={fonts.h1}>How would you rate this activity?</Text>
        <Rate rating={rating} onRating={(rate) => setRating(rate)} />
        <CustomButton text={"Submit Rating"} onPress={submitRating} />
      </View>
    </View>
  );
};

export default Rating;

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
    width: "85%",
    minHeight: "20%",
    padding: 20,
    backgroundColor: "#fff",
    opacity: 1.5,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: common.containerBorderRadius,
  },
  gainedContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  xpCoinsContainer: {
    minWidth: "40%",
    alignItems: "center",
    marginBottom: 20,
  },
  levelContainer: {
    minWidth: 100,
    minHeight: 100,
    borderRadius: 50,
    backgroundColor: "gold",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: "10%",
  },
  level: {
    color: "white",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 4,
    textShadowColor: colors.darkGrey,
  },
});
