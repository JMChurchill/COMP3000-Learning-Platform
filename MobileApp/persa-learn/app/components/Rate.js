import { StyleSheet, Text, View } from "react-native";
import React, { useMemo } from "react";
import { Ionicons } from "@expo/vector-icons";
import colors from "../config/colors";
// <Ionicons name="star" size={24} color="black" />
{
  /* <Ionicons name="star-outline" size={24} color="black" />; */
}
{
  /* <Ionicons name="star-outline" size={24} color="#FFD500" /> */
}
const Rate = ({ rating = 0, onRating, isLocked = false }) => {
  //   const [hoverRating, setHoverRating] = useState(0);

  const stars = useMemo(() => {
    return Array(5)
      .fill(0)
      .map((_, i) => (
        <Ionicons
          key={i + 1}
          name="star"
          onPress={() => (!isLocked ? onRating(i + 1) : {})}
          size={35}
          color={rating >= i + 1 ? "#FFD500" : colors.lightGrey}
        />
      ));
  });
  return <View style={styles.container}>{stars}</View>;
};

export default Rate;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
  },
});
