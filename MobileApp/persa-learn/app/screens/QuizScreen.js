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
import { checkAnswers, getQuizRequest } from "../httpRequests/quizRequests";

export default function QuizScreen({ route, navigation }) {
  const [title, setTitle] = useState();
  const [questions, setQuestions] = useState([]);

  const [answers, setAnswers] = useState([]);

  // // overlay states
  // const [earnedXp, setEarnedXp] = useState(0);
  // const [earnedCoins, setEarnedCoins] = useState(0);
  // const [level, setLevel] = useState(1);
  // const [score, setScore] = useState(0);
  // const [remainingXp, setRemaining] = useState(0);
  // const [totalXp, setTotalXp] = useState(0);

  const { quizID } = route.params;
  console.log(quizID);

  const [isComplete, setIsComplete] = useState(false);
  const [results, setResults] = useState({});

  const getQuiz = async () => {
    const data = await getQuizRequest(quizID);
    // console.log(data);
    if (data.status === "success") {
      console.log("aa:: ", data.quiz);
      setTitle(data.quiz.quizName);
      setQuestions(data.quiz.questions);
    }
  };
  const addAnswer = (questionID, answerIdx) => {
    let isFound = false;
    // check if question already answered
    answers.map((ans) => {
      if (ans.questionID == questionID) {
        ans.ans = answerIdx;
        isFound = true;
      }
    });
    if (isFound) {
      //update answers
      setAnswers([...answers]);
    } else {
      // add new answer
      setAnswers([...answers, { questionID, ans: answerIdx }]);
    }
    console.log("the answers: ", answers);
  };

  useEffect(async () => {
    console.log(quizID);

    await getQuiz();
  }, []);

  const onCompletedPressed = async () => {
    console.log("ans:", answers);
    // console.log("complete");
    if (answers.length === questions.length) {
      const data = await checkAnswers({ quizID, answers });
      console.log("data: ", data);
      // setScore(answers.length - data.wrongAnswers.length);
      // setEarnedXp(data.xp);
      // setEarnedCoins(data.coins);
      // setLevel(data.level);
      // setTotalXp(data.totalXp);
      // setRemaining(data.remainingXp);
      setResults({
        score: answers.length - data.wrongAnswers.length,
        total: questions.length,
        earnedXp: data.xp,
        coins: data.coins,
        level: data.level,
        totalXp: data.totalXp,
        remainingXp: data.remainingXp,
      });
      setIsComplete(true);
    } else {
      alert("Please answer all the questions");
    }
  };

  return (
    <>
      <ScrollView>
        <View style={styles.topBar}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.h1}>
            Progress: {answers.length}/{questions.length}
          </Text>
          <ProgressBar
            numerator={answers.length}
            denominator={questions.length}
          />
        </View>
        {questions.map((question) => {
          return (
            <QuestionBox
              key={question.QuestionID}
              questionId={question.QuestionID}
              questionName={question.Question}
              description={question.Details}
              options={question.options}
              addAnswer={addAnswer}
              answers={answers}
            />
          );
        })}

        <View style={styles.buttonContainer}>
          <CustomButton text="Completed" onPress={onCompletedPressed} />
        </View>
      </ScrollView>
      {isComplete ? (
        <CompleteOverlay
          results={results}
          setIsComplete={setIsComplete}
          quizID={quizID}
        />
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
