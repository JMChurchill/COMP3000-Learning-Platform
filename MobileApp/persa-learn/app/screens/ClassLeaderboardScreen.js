import { StyleSheet, Text, View, Image, ScrollView } from "react-native";
import React from "react";
import fonts from "../config/fonts";
import colors from "../config/colors";
import common from "../config/common";

import userIcon from "../assets/UserIcons/001-man-1.png";
import LeaderboardItem from "../components/Leaderboard/LeaderboardItem";
import TopPositionSmall from "../components/Leaderboard/TopPositionSmall";
import TopPositionLarge from "../components/Leaderboard/TopPositionLarge";

export default function ClassLeaderboardScreen() {
  return (
    <ScrollView>
      <View style={styles.root}>
        <Text style={fonts.title}>ClassName's Leaderboard</Text>
        <View style={styles.topStudents}>
          <TopPositionSmall position={2} image={userIcon} />
          <TopPositionLarge position={1} image={userIcon} />
          <TopPositionSmall position={3} image={userIcon} />
        </View>
        <View style={styles.classList}>
          <LeaderboardItem position={4} name="Bob" xp={2500} />
          <LeaderboardItem position={5} name="John" xp={2000} />
          <LeaderboardItem position={6} name="Mary" xp={1200} />
          <LeaderboardItem position={7} name="Anne" xp={900} />
          <LeaderboardItem position={8} name="Bob" xp={800} />
          <LeaderboardItem position={9} name="John" xp={700} />
          <LeaderboardItem position={10} name="Mary" xp={400} />
          <LeaderboardItem position={11} name="Anne" xp={100} />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: "center",
  },
  topStudents: {
    borderWidth: 1,
    width: "100%",
    // aspectRatio: 4 / 1,
    flexDirection: "row",
    alignItems: "baseline",
    justifyContent: "space-evenly",
    paddingVertical: 15,
    // backgroundColor: "gold",
  },
  topStudent: {
    borderWidth: 5,
    borderRadius: 100,
    width: "25%",
    aspectRatio: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  first: {
    borderWidth: 5,
    borderColor: "gold",
    borderRadius: 100,
    width: "35%",
    aspectRatio: 1,
  },
  userIcon: {
    height: "100%",
    position: "absolute",
  },
  topPosition: {
    width: "100%",
    position: "absolute",
    alignItems: "center",
    bottom: 0,
    // right: 0,
    transform: [{ translateY: 20 }],
  },
  topPositionBox: {
    backgroundColor: "silver",
    padding: 5,
    // paddingVertical: 10,
    borderRadius: 100,
    aspectRatio: 1,
    // minwidth: "20%",
    justifyContent: "center",
    alignItems: "center",
  },
  topPositionText: {
    fontWeight: "bold",
    color: colors.secondaryText,
  },
  classList: {
    borderWidth: 1,
    borderColor: "red",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: "5%",
  },
});
