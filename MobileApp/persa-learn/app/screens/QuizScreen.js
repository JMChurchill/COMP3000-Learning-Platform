import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";
import { ScrollView } from "react-native-gesture-handler";
import fonts from "../config/fonts";
import colors from "../config/colors";
import ProgressBar from "../components/ProgressBar";
import QuestionBox from "../components/QuizQuestion/QuestionBox";

export default function QuizScreen() {
  const [numberAnswered, setNumberAnswered] = useState(1);
  const [numberQuestions, setNumberQuestions] = useState(5);
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const data = [
      {
        question: "1+1=?",
        details: "addition",
        options: [
          { id: 1, value: "2" },
          { id: 2, value: "3" },
          { id: 3, value: "5" },
        ],
      },
      {
        question: "2+1=?",
        details: "addition",
        options: [
          { id: 1, value: "10" },
          { id: 2, value: "3" },
          { id: 3, value: "-1" },
        ],
      },
      {
        question: "1x1=?",
        details: "addition",
        options: [
          { id: 1, value: "2" },
          { id: 2, value: "-1" },
          { id: 3, value: "1" },
        ],
      },
    ];
    setQuestions(data);
  });
  return (
    <ScrollView>
      <View style={styles.topBar}>
        <Text style={styles.title}>Quiz title</Text>
        <Text style={styles.h1}>
          Progress: {numberAnswered}/{numberQuestions}
        </Text>
        <ProgressBar numAns={numberAnswered} numQues={numberQuestions} />
      </View>

      <QuestionBox />
      <QuestionBox />
      <QuestionBox />
      <QuestionBox />
    </ScrollView>
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
    // borderColor: "red",
    // borderWidth: 1,
    backgroundColor: colors.cardBackground,
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
