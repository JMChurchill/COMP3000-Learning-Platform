import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import colors from "../../config/colors";
import fonts from "../../config/fonts";
import common from "../../config/common";

import userIcon from "../../assets/UserIcons/001-man-1.png";
import CustomButton from "../CustomButton/CustomButton";

export default function SharedItem({ id, sName, iName }) {
  return (
    <View style={[styles.listItem, common.shadow]}>
      {/* <Text style={fonts.large}>{id}.</Text> */}
      <View style={styles.row}>
        <Image
          source={userIcon}
          style={styles.userIcon}
          resizeMode={"contain"}
        />
        <Text style={fonts.large}>{sName}</Text>
      </View>
      <View style={styles.row}>
        <Text style={fonts.large}>Shared their {iName}</Text>
      </View>
      <CustomButton
        // style={{ marginHorizontal: 10 }}
        text="View"
        type="SECONDARY"
        // onPress={onBackPressed}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    textAlign: "center",
    // alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    paddingVertical: 5,
    // borderWidth: 1,
  },
  listItem: {
    backgroundColor: colors.cardBackground,
    marginVertical: 5,
    flexDirection: "column",
    alignContent: "center",
    justifyContent: "center",
    paddingVertical: 10,
    borderRadius: common.containerBorderRadius,
    padding: 20,
  },
  userIcon: {
    height: "100%",
    width: 40,
  },
});
