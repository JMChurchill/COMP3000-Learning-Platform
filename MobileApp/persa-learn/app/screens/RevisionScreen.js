import { StyleSheet, Text, View } from "react-native";
import React, { useContext } from "react";
import * as SecureStore from "expo-secure-store";

import Item from "../components/revision/Item";

import fonts from "../config/fonts";

import flashCardIm from "../assets/RevisionItemIcons/undraw_Notes_re_pxhw.png";
import noteBookIm from "../assets/RevisionItemIcons/undraw_Notebook.png";

export default function RevisionScreen() {
  return (
    <View style={styles.root}>
      <Text style={fonts.title}>Revision</Text>
      <Text style={fonts.h1}>Select a revision method</Text>
      <View style={styles.itemContainer}>
        <Item name="Flash card" image={flashCardIm} screenName="FlashCards" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: "center",
  },
  itemContainer: {
    // borderWidth: 1,
    width: "100%",
    flexDirection: "row",
    padding: 10,
    flexWrap: "wrap",
    justifyContent: "space-evenly",
  },
});
