import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

import fonts from "../../config/fonts";
import colors from "../../config/colors";
import common from "../../config/common";

export default function AssignmentItem({ id, title, dueDate }) {
  const navigation = useNavigation();

  const listItemOnPress = (id) => {
    console.log("pressed ", id);
    navigation.navigate("Quiz");
  };
  return (
    <TouchableOpacity
      style={[styles.listItem, common.shadow]}
      onPress={() => listItemOnPress(id)}
    >
      <Text style={fonts.large}>{id}.</Text>
      <Text style={fonts.large}>{title},</Text>
      <Text style={fonts.large}>{dueDate}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  listItem: {
    backgroundColor: colors.cardBackground,
    marginVertical: 5,
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 10,
    borderRadius: common.containerBorderRadius,
  },
});
