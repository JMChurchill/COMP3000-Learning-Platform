import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";
import { ScrollView } from "react-native-gesture-handler";
import fonts from "../config/fonts";
import colors from "../config/colors";
import ProgressBar from "../components/ProgressBar";
import QuestionBox from "../components/QuizQuestion/QuestionBox";
import CustomButton from "../components/CustomButton/CustomButton";
import common from "../config/common";

export default function QuizScreen() {
  const [numberAnswered, setNumberAnswered] = useState(1);
  const [numberQuestions, setNumberQuestions] = useState(5);
  const [questions, setQuestions] = useState([]);

  const [isComplete, setIsComplete] = useState(false);
  const [results, setResults] = useState({
    correct: 3,
    totalQuestions: 10,
    xpGained: 150,
  });

  useEffect(async () => {
    const data = [
      {
        id: 1,
        question: "1+1=?",
        details: "addition",
        options: [
          { id: 1, value: "2" },
          { id: 2, value: "3" },
          { id: 3, value: "5" },
        ],
      },
      {
        id: 2,
        question: "2+1=?",
        details: "addition",
        options: [
          { id: 1, value: "10" },
          { id: 2, value: "3" },
          { id: 3, value: "-1" },
        ],
      },
      {
        id: 3,
        question: "1x1=?",
        details: "addition",
        options: [
          { id: 1, value: "2" },
          { id: 2, value: "-1" },
          { id: 3, value: "1" },
        ],
      },
    ];
    await setQuestions(data);
  }, []);

  const onCompletedPressed = () => {
    console.log("complete");
    setIsComplete(true);
  };
  const onBackPressed = () => {
    setIsComplete(false);
  };

  return (
    <>
      <ScrollView>
        <View style={styles.topBar}>
          <Text style={styles.title}>Quiz title</Text>
          <Text style={styles.h1}>
            Progress: {numberAnswered}/{numberQuestions}
          </Text>
          <ProgressBar
            numerator={numberAnswered}
            denominator={numberQuestions}
          />
        </View>
        {questions.map((question) => {
          return (
            <QuestionBox
              key={question.id}
              questionName={question.question}
              description={question.details}
              options={question.options}
            />
          );
        })}

        <View style={styles.buttonContainer}>
          <CustomButton text="Completed" onPress={onCompletedPressed} />
        </View>
      </ScrollView>
      {isComplete ? (
        <View style={styles.overlay}>
          <View style={styles.overlayWindow}>
            <Text style={fonts.title}>Completed</Text>
            <Text style={fonts.h1}>
              {results.correct}/{results.totalQuestions}
            </Text>
            <View style={[styles.levelContainer, common.shadowStrong]}>
              <Text style={[fonts.title, styles.level]}>Lv8</Text>
            </View>
            <View style={styles.gainedContainer}>
              <View style={styles.xpCoinsContainer}>
                <Text
                  style={[fonts.h1, { color: "black", fontWeight: "bold" }]}
                >
                  +100
                </Text>
                <Text style={[fonts.h3]}>xp earned</Text>
              </View>
              <View style={styles.xpCoinsContainer}>
                <Text
                  style={[fonts.h1, { color: "black", fontWeight: "bold" }]}
                >
                  +100
                </Text>
                <Text style={[fonts.h3]}>Coins earned</Text>
              </View>
            </View>
            <ProgressBar
              numerator={results.correct}
              denominator={results.totalQuestions}
            />
            <Text style={{ marginVertical: 10 }}>200/1000XP</Text>
            <CustomButton
              // style={{ marginHorizontal: 10 }}
              text="Go back"
              onPress={onBackPressed}
            />
            <CustomButton
              // style={{ marginHorizontal: 10 }}
              text="Go To Shop"
              type="SECONDARY"
              onPress={onBackPressed}
            />
          </View>
        </View>
      ) : (
        <></>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  title: fonts.title,
  h1: fonts.h1,
  root: {
    flex: 1,
    alignItems: "center",
  },
  topBar: {
    backgroundColor: colors.cardBackground,
  },
  buttonContainer: {
    marginHorizontal: 10,
  },
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
