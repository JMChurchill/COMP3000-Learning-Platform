import { StyleSheet, Text, View, Animated, Button } from "react-native";
import React, { useRef } from "react";
import fonts from "../../../../config/fonts";
import colors from "../../../../config/colors";
import common from "../../../../config/common";
import CustomButton from "../../../CustomButton/CustomButton";
import { Ionicons } from "@expo/vector-icons";

const FlashCard = ({
  deck,
  index,
  setIndex,
  isFlipped,
  setIsFlipped,
  setScore,
  score,
  setIsComplete,
}) => {
  const animate = useRef(new Animated.Value(0));

  const nextCard = async () => {
    if (index + 1 < deck.length) {
      setIndex(index + 1);
      handleFlipNoAN();
    } else {
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

  const correct = () => {
    setScore(score + 1);
    nextCard();
  };

  return (
    <>
      <Animated.View
        style={[
          styles.flashcard,
          styles.flashcardFront,
          { transform: [{ rotateY: interpolateFront }] },
          styles.hidden,
        ]}
      >
        <Text style={[fonts.h1, { color: colors.mainText }]}>
          {deck[index].Question}
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
          {deck[index].Answer}
        </Text>
      </Animated.View>
      {/* <Button title="Flip" onPress={handleFlip} /> */}
      <View style={styles.buttonsContainer}>
        <CustomButton text={"Flip"} onPress={handleFlip} />

        {isFlipped ? (
          <>
            <CustomButton
              text={"Correct"}
              onPress={correct}
              icon={"checkmark"}
              bgColor={colors.selectColor}
            />
            <CustomButton
              text={"Wrong"}
              onPress={nextCard}
              icon={"close"}
              bgColor={"red"}
            />
          </>
        ) : (
          <></>
        )}
      </View>
    </>
  );
};

export default FlashCard;

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
  buttonsContainer: {
    paddingHorizontal: 100,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    flexWrap: "wrap",
  },
});
