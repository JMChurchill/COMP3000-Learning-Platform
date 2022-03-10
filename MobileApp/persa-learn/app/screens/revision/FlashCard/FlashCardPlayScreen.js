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

export default function FlashCardPlayScreen() {
  const [isFlipped, setIsFlipped] = useState(false);
  const animate = useRef(new Animated.Value(0));

  const handleFlip = () => {
    Animated.timing(animate.current, {
      duration: 300,
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
            <Text style={[fonts.h1, { color: colors.mainText }]}>Front</Text>
          </Animated.View>
          <Animated.View
            style={[
              styles.flashcardBack,
              styles.flashcard,
              { transform: [{ rotateY: interpolateBack }] },
              styles.hidden,
            ]}
          >
            <Text style={[fonts.h1, { color: colors.mainText }]}>Back</Text>
          </Animated.View>
          <Button title="Flip" onPress={handleFlip} />
        </View>
      </View>
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
