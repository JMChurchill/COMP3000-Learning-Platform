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
import React, { useRef, useState } from "react";
import fonts from "../../../config/fonts";
import colors from "../../../config/colors";
import common from "../../../config/common";
import CompleteOverlay from "../../../components/revision/CompleteOverlay";

export default function FlashCardPlayScreen() {
  const [score, setScore] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [index, setIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const animate = useRef(new Animated.Value(0));

  const deck = [
    { front: "question1", back: "answer1" },
    { front: "question2", back: "answer2" },
    { front: "question3", back: "answer3" },
    { front: "question4", back: "answer4" },
    { front: "question5", back: "answer5" },
    { front: "question6", back: "answer6" },
  ];

  const correct = () => {
    setScore(score + 1);
    nextCard();
  };
  const nextCard = async () => {
    if (index + 1 < deck.length) {
      setIndex(index + 1);
      handleFlipNoAN();
      console.warn(`next card -> score: ${score}`);
    } else {
      console.warn(`Complete! ${index}`);
      setIsComplete(true);
    }
  };

  const handleFlip = () => {
    Animated.timing(animate.current, {
      duration: 300,
      toValue: isFlipped ? 0 : 180,
      useNativeDriver: true,
    }).start(() => setIsFlipped(!isFlipped));
  };
  const handleFlipNoAN = () => {
    Animated.timing(animate.current, {
      duration: 0,
      toValue: isFlipped ? 0 : 180,
      useNativeDriver: true,
    }).start(() => setIsFlipped(!isFlipped));
  };

  const interpolateFront = animate.current.interpolate({
    inputRange: [0, 180],
    outputRange: ["0deg", "180deg"],
  });

  const interpolateBack = animate.current.interpolate({
    inputRange: [0, 180],
    outputRange: ["180deg", "360deg"],
  });

  return (
    <View style={styles.root}>
      <Text style={fonts.title}>FlashCardPlay</Text>
      <Text style={fonts.h1}>Score: {score}</Text>
      <Text style={fonts.h1}>Remaining: {deck.length - index - 1}</Text>
      <View
        style={{
          width: "100%",
          height: "80%",
          justifyContent: "center",
          alignItems: "center",
          borderWidth: 1,
        }}
      >
        <View
          style={{
            width: "100%",
            height: "60%",
            // justifyContent: "center",
            alignItems: "center",
            borderWidth: 1,
          }}
        >
          <Animated.View
            style={[
              styles.flashcard,
              styles.flashcardFront,
              { transform: [{ rotateY: interpolateFront }] },
              styles.hidden,
            ]}
          >
            <Text style={[fonts.h1, { color: colors.mainText }]}>
              {deck[index].front}
            </Text>
          </Animated.View>
          <Animated.View
            style={[
              styles.flashcardBack,
              styles.flashcard,
              { transform: [{ rotateY: interpolateBack }] },
              styles.hidden,
            ]}
          >
            <Text style={[fonts.h1, { color: colors.mainText }]}>
              {deck[index].back}
            </Text>
          </Animated.View>
          <Button title="Flip" onPress={handleFlip} />
          {isFlipped ? (
            <>
              <Button title="Correct" color="green" onPress={correct} />
              <Button title="Wrong" color="red" onPress={nextCard} />
            </>
          ) : (
            <></>
          )}
        </View>
      </View>
      {isComplete ? (
        <CompleteOverlay
          results={{ correct: score, total: deck.length }}
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
    width: "70%",
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
