import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import colors from "../../config/colors";

export default function OptionBox({
  optionID = 1,
  optionText = "placeholder",
}) {
  const optionOnPress = (id) => {
    console.log(id);
  };
  return (
    <TouchableOpacity
      style={[styles.option, styles.shadow]}
      onPress={() => optionOnPress(optionID)}
    >
      <View style={styles.checkbox}></View>
      <Text style={styles.optionText}>{optionText}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  option: {
    marginHorizontal: 10,
    marginVertical: 5,
    backgroundColor: colors.cardBackground,
    // paddingVertical: 5,
    borderRadius: 25,
    minHeight: 50,
    flexDirection: "row",
  },
  optionText: {
    fontSize: 20,
    marginLeft: 20,
    alignSelf: "center",
  },
  checkbox: {
    alignSelf: "center",
    height: 50,
    aspectRatio: 1,
    backgroundColor: colors.selectColor,
    borderRadius: 25,
  },
  shadow: {
    //android
    elevation: 5,
    //ios
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
  },
});
