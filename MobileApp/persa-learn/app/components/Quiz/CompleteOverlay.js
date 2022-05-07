import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import ProgressBar from "../ProgressBar";
import CustomButton from "../CustomButton/CustomButton";

import common from "../../config/common";
import colors from "../../config/colors";
import fonts from "../../config/fonts";
import { useNavigation } from "@react-navigation/native";
import Rating from "./Rating";
import {
  shareSubmission,
  unshareSubmission,
} from "../../httpRequests/submissionRequests";

export default function CompleteOverlay({ results, setIsComplete, quizID }) {
  const [isRating, setIsRating] = useState(false);
  const [isShared, setIsShared] = useState(false);
  const navigation = useNavigation();
  const onBackPressed = () => {
    setIsComplete(false);
  };
  const share = async () => {
    const data = await shareSubmission({ quizID: quizID });
    if (data.status === "success") {
      setIsShared(true);
    }
  };
  const unshare = async () => {
    const data = await unshareSubmission({ quizID: quizID });
    if (data.status === "success") {
      setIsShared(false);
    }
  };
  return (
    <View style={styles.overlay}>
      <View style={styles.overlayWindow}>
        <Text style={fonts.title}>Completed</Text>
        <Text style={fonts.h1}>
          {results.score}/{results.total}
        </Text>
        <View style={[styles.levelContainer, common.shadowStrong]}>
          <Text style={[fonts.title, styles.level]}>Lv{results.level}</Text>
        </View>
        <View style={styles.gainedContainer}>
          <View style={styles.xpCoinsContainer}>
            <Text style={[fonts.h1, { color: "black", fontWeight: "bold" }]}>
              +{results.earnedXp}
            </Text>
            <Text style={[fonts.h3]}>xp earned</Text>
          </View>
          <View style={styles.xpCoinsContainer}>
            <Text style={[fonts.h1, { color: "black", fontWeight: "bold" }]}>
              +{results.coins}
            </Text>
            <Text style={[fonts.h3]}>Coins earned</Text>
          </View>
        </View>
        <ProgressBar
          numerator={results.totalXp}
          denominator={results.remainingXp}
        />
        <Text style={{ marginVertical: 10 }}>
          {results.totalXp}/{results.remainingXp}xp
        </Text>
        <CustomButton text="Done" onPress={() => setIsRating(true)} />
        {!isShared ? (
          <CustomButton text="Share" type="SECONDARY" onPress={share} />
        ) : (
          <CustomButton text="Unshared" type="SECONDARY" onPress={unshare} />
        )}

        <CustomButton
          text="Go To Shop"
          type="SECONDARY"
          onPress={() => navigation.navigate("Shop")}
        />
      </View>
      {isRating ? (
        <Rating quizID={quizID} close={() => setIsRating(false)} />
      ) : (
        <></>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    flex: 1,
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    alignItems: "center",
    justifyContent: "center",
  },
  overlayWindow: {
    width: "90%",
    minHeight: "20%",
    padding: 20,
    backgroundColor: "#fff",
    opacity: 1.5,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: common.containerBorderRadius,
  },
  gainedContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  xpCoinsContainer: {
    minWidth: "40%",
    alignItems: "center",
    marginBottom: 20,
  },
  levelContainer: {
    minWidth: 100,
    minHeight: 100,
    borderRadius: 50,
    backgroundColor: "gold",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: "10%",
  },
  level: {
    color: "white",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 4,
    textShadowColor: colors.darkGrey,
  },
});
