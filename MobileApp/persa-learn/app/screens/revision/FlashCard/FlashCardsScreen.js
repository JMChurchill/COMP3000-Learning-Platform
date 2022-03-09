import { StyleSheet, Text, View } from "react-native";
import React from "react";
import fonts from "../../../config/fonts";

export default function FlashCardsScreen() {
  return (
    <View style={styles.root}>
      <Text style={fonts.title}>FlashCardsScreen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: "center",
  },
});
