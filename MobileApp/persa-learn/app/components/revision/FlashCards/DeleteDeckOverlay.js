import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import common from "../../../config/common";
import fonts from "../../../config/fonts";
import CustomButton from "../../CustomButton/CustomButton";

export default function DeleteDeckOverlay({ setIsDelete }) {
  const navigation = useNavigation();

  const yesPressed = () => {
    console.warn("Deleted deck");
    navigation.navigate("FlashCards");
  };
  const noPressed = () => {
    setIsDelete(false);
  };
  return (
    <View style={styles.overlay}>
      <View style={[styles.overlayWindow, common.shadow]}>
        <Text style={fonts.title}>Delete Deck</Text>
        <Text style={fonts.h1}>Are you sure you want to delete this deck?</Text>

        <CustomButton
          // style={{ marginHorizontal: 10 }}
          text="Yes"
          onPress={yesPressed}
        />
        <CustomButton
          // style={{ marginHorizontal: 10 }}
          text="No"
          type="SECONDARY"
          onPress={noPressed}
        />
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
