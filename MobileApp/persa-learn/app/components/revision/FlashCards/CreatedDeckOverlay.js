import { StyleSheet, Text, View } from "react-native";
import React from "react";
import CustomButton from "../../CustomButton/CustomButton";
import common from "../../../config/common";
import fonts from "../../../config/fonts";
import { useNavigation } from "@react-navigation/native";

export default function CreatedDeckOverlay({ title, module }) {
  const navigation = useNavigation();

  const finishedPressed = () => {
    navigation.navigate("FlashCards");
  };
  const addToDeckPressed = () => {
    navigation.navigate("FlashCardCreate");
  };
  return (
    <View style={styles.overlay}>
      <View style={[styles.overlayWindow, common.shadow]}>
        <Text style={fonts.title}>Created Deck</Text>
        <Text style={fonts.h1}>Title: {title}</Text>
        {/* <Text style={fonts.h2}>Module: {module}</Text> */}

        <CustomButton
          // style={{ marginHorizontal: 10 }}
          text="Finsh"
          onPress={finishedPressed}
        />
        {/* <CustomButton
          // style={{ marginHorizontal: 10 }}
          text="Add to Deck"
          type="SECONDARY"
          onPress={addToDeckPressed}
        /> */}
      </View>
    </View>
  );
}

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
    zIndex: 999999999,
    elevation: 5,
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
