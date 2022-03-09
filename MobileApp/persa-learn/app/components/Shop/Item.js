import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import colors from "../../config/colors";
import common from "../../config/common";
import fonts from "../../config/fonts";

export default function Item() {
  return (
    <View style={[styles.itemContainer, common.shadow]}>
      <Image
        style={styles.tinyLogo}
        source={{
          uri: "https://reactnative.dev/img/tiny_logo.png",
        }}
      />
      <Text style={[fonts.h2, { color: colors.mainText }]}>ItemName</Text>
      <Text style={fonts.h3}>100 coins</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    padding: 10,
    margin: 10,
    width: "40%",
    alignItems: "center",
    backgroundColor: colors.cardBackground,
    borderRadius: common.containerBorderRadius,
  },
  tinyLogo: {
    width: 120,
    height: 120,
  },
});
