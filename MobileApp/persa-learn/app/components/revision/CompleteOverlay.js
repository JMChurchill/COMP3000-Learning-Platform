import { StyleSheet, Text, View } from "react-native";
import React from "react";
import CustomButton from "../CustomButton/CustomButton";
import common from "../../config/common";
import fonts from "../../config/fonts";
import { useNavigation } from "@react-navigation/native";

export default function CompleteOverlay({ results, setIsComplete }) {
  const navigation = useNavigation();

  const onBackPressed = () => {
    setIsComplete(false);
  };
  const donePressed = () => {
    navigation.navigate("FlashCards");
  };
  return (
    <View style={styles.overlay}>
      <View style={styles.overlayWindow}>
        <Text style={fonts.title}>Completed</Text>
        <Text style={fonts.h1}>
          {results.correct}/{results.total}
        </Text>
        <CustomButton
          // style={{ marginHorizontal: 10 }}
          text="Done"
          onPress={donePressed}
        />
        <CustomButton
          // style={{ marginHorizontal: 10 }}
          text="Back"
          type="SECONDARY"
          onPress={onBackPressed}
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
