import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";
import { ScrollView } from "react-native-gesture-handler";
import fonts from "../config/fonts";
import colors from "../config/colors";
import ProgressBar from "../components/ProgressBar";
import QuestionBox from "../components/Quiz/QuizQuestion/QuestionBox";
import CustomButton from "../components/CustomButton/CustomButton";
import common from "../config/common";
import CompleteOverlay from "../components/Quiz/CompleteOverlay";

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
        <CompleteOverlay results={results} setIsComplete={setIsComplete} />
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
});
