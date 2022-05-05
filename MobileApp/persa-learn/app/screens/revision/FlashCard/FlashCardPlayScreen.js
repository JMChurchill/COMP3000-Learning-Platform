import {
  StyleSheet,
  Text,
  View,
  Button,
  Animated,
  Pressable,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from "react-native";
import React, { useRef, useState, useEffect, useContext } from "react";
import fonts from "../../../config/fonts";
import colors from "../../../config/colors";
import common from "../../../config/common";
import CompleteOverlay from "../../../components/revision/CompleteOverlay";
import { getFlashCardsRequest } from "../../../httpRequests/flashcardRequests";
import FlashCard from "../../../components/revision/FlashCards/Play/FlashCard";
import CustomButton from "../../../components/CustomButton/CustomButton";
import * as SecureStore from "expo-secure-store";
import { AuthContext } from "../../../components/context";

export default function FlashCardPlayScreen({ route, navigation }) {
  const { signOut } = useContext(AuthContext);

  const [score, setScore] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [index, setIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const animate = useRef(new Animated.Value(0));

  const [cards, setCards] = useState([]);

  const { deckID } = route.params;

  const deck = [
    { front: "question1", back: "answer1" },
    { front: "question2", back: "answer2" },
    { front: "question3", back: "answer3" },
    { front: "question4", back: "answer4" },
    { front: "question5", back: "answer5" },
    { front: "question6", back: "answer6" },
  ];

  useEffect(async () => {
    try {
      const data = await getFlashCardsRequest({ deckID });
      if (data.status === "success") {
        setCards(data.flashCards);
      }
    } catch (e) {}
    if ((await SecureStore.getItemAsync("userToken")) === null) {
      signOut();
    }
  }, []);
  return (
    <View style={styles.root}>
      <Text style={fonts.title}>FlashCardPlay</Text>
      <Text style={fonts.h1}>Score: {score}</Text>
      {cards.length != 0 ? (
        <Text style={fonts.h1}>Remaining: {cards.length - index - 1}</Text>
      ) : (
        <></>
      )}

      <View
        style={{
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {cards.length != 0 ? (
          <FlashCard
            deck={cards}
            index={index}
            setIndex={setIndex}
            isFlipped={isFlipped}
            setIsFlipped={setIsFlipped}
            setScore={setScore}
            score={score}
            setIsComplete={setIsComplete}
          />
        ) : (
          <View
            style={{
              width: "100%",
              padding: 40,
              display: "flex",
              alignItems: "center",
            }}
          >
            <Text>No cards</Text>
            <CustomButton
              text={"Go Back"}
              onPress={() => navigation.navigate("FlashCards")}
            />
          </View>
        )}
      </View>
      {isComplete ? (
        <CompleteOverlay
          results={{ correct: score, total: cards.length }}
          setIsComplete={setIsComplete}
        />
      ) : (
        <></>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: "center",
  },
  flashcard: {
    borderWidth: 1,
    width: "80%",
    minHeight: 200,
    // width: "80%",
    // minHeight: "40%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: common.containerBorderRadius,
    backgroundColor: "yellow",
  },
  hidden: {
    backfaceVisibility: "hidden",
  },
  flashcardBack: {
    position: "absolute",
    top: 0,
  },
});
