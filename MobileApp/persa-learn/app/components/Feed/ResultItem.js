import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

import common from "../../config/common";
import colors from "../../config/colors";
import fonts from "../../config/fonts";

export default function ResultItem({
  id,
  sName,
  score,
  aName,
  profilePicture,
  total,
}) {
  const navigation = useNavigation();

  return (
    <View style={[styles.listItem, common.shadow]}>
      {/* <Text style={fonts.large}>{id}.</Text> */}
      <View style={styles.row}>
        <Image
          source={{
            uri: profilePicture,
          }}
          style={styles.userIcon}
          resizeMode={"contain"}
        />
        <Text style={fonts.large}>{sName}</Text>
      </View>
      <View style={styles.row}>
        <Text style={fonts.large}>
          Scored {score}/{total} on {aName}
        </Text>
      </View>
      <Text style={styles.row}>🎉🎉🎉</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    paddingVertical: 5,
  },
  listItem: {
    backgroundColor: colors.cardBackground,
    marginVertical: 5,
    flexDirection: "column",
    alignContent: "center",
    justifyContent: "center",
    paddingVertical: 10,
    borderRadius: common.containerBorderRadius,
  },
  userIcon: {
    height: "100%",
    aspectRatio: 1,
    width: 40,
    marginRight: 10,
  },
});
