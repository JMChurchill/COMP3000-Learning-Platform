import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import colors from "../../../config/colors";
import fonts from "../../../config/fonts";
import OptionBox from "./OptionBox";
import common from "../../../config/common";

export default function QuestionBox({
  questionName = "placeholder",
  description = "Lorem ipsum dolor sit.",
  options = [],
  addAnswer,
  questionId,
  answers,
}) {
  const logToCon = async (e) => {
    addAnswer(questionId, e);
  };
  const isAnswered = (i) => {
    let answered = false;
    answers.map((ans) => {
      if (questionId === ans.questionID) {
        if (ans.ans === i) {
          answered = true;
        }
      }
    });
    return answered;
  };
  return (
    <View style={[styles.questionBox, styles.shadow]}>
      <View style={[styles.questBoxTop, styles.shadow]}>
        <Text style={fonts.h1}>{questionName}</Text>
        <Text style={fonts.h2}>{description}</Text>
      </View>
      {options.map((option, i) => {
        // let isAns = isAnswered(i);
        let isAns = isAnswered(option.TheOption);

        return (
          <OptionBox
            key={i}
            questionID={option.QuestionID}
            optionID={i}
            optionText={option.TheOption}
            logToCon={logToCon}
            isSelected={isAns}
          />
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  questionBox: {
    // borderColor: colors.lightGrey,
    // borderWidth: 1,
    margin: 10,
    borderRadius: common.containerBorderRadius,
    backgroundColor: colors.cardBackground,
    paddingBottom: 10,
  },
  questBoxTop: {
    // borderColor: colors.lightGrey,
    // borderWidth: 1,
    padding: 10,
    borderRadius: common.containerBorderRadius,
    backgroundColor: colors.cardBackground,
    marginBottom: 10,
  },
  shadow: {
    //android
    elevation: 5,
    //ios
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
  },
});
