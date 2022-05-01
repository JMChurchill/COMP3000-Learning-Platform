import { StyleSheet, Text, View, Pressable } from "react-native";
import React from "react";
import colors from "../../config/colors";
import common from "../../config/common";
import { Ionicons } from "@expo/vector-icons";

export default function CustomButton({
  onPress,
  text,
  icon = false,
  type = "PRIMARY",
  bgColor,
  fgColor,
}) {
  if (icon) {
    return (
      <Pressable
        onPress={onPress}
        style={[
          styles.container,
          styles[`container_${type}`],
          {
            width: "auto",
            aspectRatio: 1,
            borderRadius: 1000,
            alignItems: "center",
            justifyContent: "center",
            margin: 10,
          },
          bgColor ? { backgroundColor: bgColor } : {},
        ]}
      >
        <Ionicons name={icon} size={28} color="white" />
      </Pressable>
    );
  } else {
    return (
      <Pressable
        onPress={onPress}
        style={[
          styles.container,
          styles[`container_${type}`],
          bgColor ? { backgroundColor: bgColor } : {},
        ]}
      >
        <Text
          style={[
            styles.text,
            styles[`text_${type}`],
            fgColor ? { color: fgColor } : {},
          ]}
        >
          {text}
        </Text>
      </Pressable>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    padding: 15,
    marginVertical: 5,
    alignItems: "center",
    borderRadius: common.containerBorderRadius,
  },
  container_PRIMARY: {
    backgroundColor: colors.primary,
  },
  container_SECONDARY: {
    borderColor: colors.primary,
    borderWidth: 2,
  },
  container_TERTIARY: {},
  container_ICON: {
    borderRadius: 200,
    borderColor: colors.primary,
  },
  text: {
    fontWeight: "bold",
    color: "white",
  },
  text_TERTIARY: {
    color: "grey",
  },
  text_SECONDARY: {
    color: colors.primary,
  },
});
