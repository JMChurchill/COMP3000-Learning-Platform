import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React from "react";
import colors from "../../config/colors";
import common from "../../config/common";
import fonts from "../../config/fonts";
import { back } from "react-native/Libraries/Animated/Easing";

const ThemeItem = ({
  setSelectedItem,
  setShowDetails,
  id,
  primaryColor,
  backgroundColor,
  isDark = false,
  name = "temp",
  cost = 0,
  reqLevel,
  image = "https://reactnative.dev/img/tiny_logo.png",
  isPurchased,
}) => {
  const showItemDetails = () => {
    setSelectedItem({
      type: "theme",
      id,
      primaryColor,
      backgroundColor,
      isDark,
      name,
      cost,
      reqLevel,
    });
    setShowDetails(true);
  };
  return (
    <TouchableOpacity
      style={[
        styles.itemContainer,
        common.shadow,
        isPurchased ? { opacity: 0.5 } : {},
      ]}
      onPress={!isPurchased ? () => showItemDetails() : () => {}}
    >
      {/* <Image
        style={styles.tinyLogo}
        source={{
          uri: image,
        }}
      /> */}
      <View style={[styles.primaryColor, { backgroundColor: primaryColor }]}>
        <View
          style={[styles.backgroundColor, { backgroundColor: backgroundColor }]}
        >
          <Text
            style={[
              fonts.h2,
              isDark == "true" || isDark == true
                ? { color: "white" }
                : { color: "black" },
            ]}
          >
            abc
          </Text>
        </View>
      </View>
      <Text style={[fonts.h2, { color: colors.mainText }]}>{name}</Text>
      <Text style={fonts.h3}>{cost} coins</Text>
      <Text style={fonts.h3}>Level {reqLevel}</Text>
    </TouchableOpacity>
  );
};

export default ThemeItem;

const styles = StyleSheet.create({
  itemContainer: {
    padding: 10,
    margin: 10,
    width: "40%",
    alignItems: "center",
    backgroundColor: colors.cardBackground,
    borderRadius: common.containerBorderRadius,
  },
  primaryColor: {
    width: 120,
    height: 120,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 100,
  },
  backgroundColor: {
    width: "80%",
    height: "80%",
    borderRadius: 100,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});
