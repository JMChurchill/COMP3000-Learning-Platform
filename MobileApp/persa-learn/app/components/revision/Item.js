import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React from "react";
import fonts from "../../config/fonts";
import colors from "../../config/colors";
import common from "../../config/common";
import { useNavigation } from "@react-navigation/native";

export default function Item({
  name = "placeholder",
  image = "https://reactnative.dev/img/tiny_logo.png",
  screenName = "Revision",
}) {
  const navigation = useNavigation();

  const methodOnPress = (sName) => {
    console.log("pressed ", sName);
    navigation.navigate(sName);
  };
  return (
    <TouchableOpacity
      style={[styles.container, common.shadow]}
      onPress={() => {
        methodOnPress(screenName);
      }}
    >
      <Image
        style={styles.tinyLogo}
        source={
          typeof image === "string"
            ? {
                uri: image,
              }
            : image
        }
      />
      <Text style={fonts.h1}>{name}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
    backgroundColor: colors.cardBackground,
    borderRadius: common.containerBorderRadius,
    overflow: "hidden",
  },
  tinyLogo: {
    width: 140,
    height: 120,
  },
});
