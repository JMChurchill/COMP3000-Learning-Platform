import { StyleSheet, Text, View, Image, ScrollView } from "react-native";
import React, { useEffect, useState, useContext } from "react";
import fonts from "../config/fonts";
import colors from "../config/colors";
import common from "../config/common";
import * as SecureStore from "expo-secure-store";

import userIcon from "../assets/UserIcons/001-man-1.png";
import LeaderboardItem from "../components/Leaderboard/LeaderboardItem";
import TopPositionSmall from "../components/Leaderboard/TopPositionSmall";
import TopPositionLarge from "../components/Leaderboard/TopPositionLarge";
import { getStudentsByClass } from "../httpRequests/classRequests";
import { AuthContext } from "../components/context";

export default function ClassLeaderboardScreen({ route, navigation }) {
  const { signOut } = useContext(AuthContext);

  const { classID } = route.params;
  const [students, setStudents] = useState([]);
  const [topThree, setTopThree] = useState([]);

  const getTopThree = () => {
    if (students.length > 1) {
      // get first 3 values from array
      const tempArray = students.slice(0, 3);
      // switch order to be displayed later
      const tempVal = tempArray[0];
      tempArray[0] = tempArray[1];
      tempArray[1] = tempVal;
      setTopThree(tempArray);
    } else if (students.length === 1) {
      const tempArray = [students[0]];
      setTopThree(tempArray);
    }
  };

  useEffect(async () => {
    try {
      const data = await getStudentsByClass({ classID });
      console.log(data);
      if (data.status === "success") {
        setStudents(data.data);
      }
    } catch (e) {}
    if ((await SecureStore.getItemAsync("userToken")) === null) {
      signOut();
    }
  }, []);

  useEffect(async () => {
    getTopThree();
  }, [students]);

  return (
    <ScrollView>
      <View style={styles.root}>
        <Text style={fonts.title}>ClassName's Leaderboard</Text>
        <View style={styles.topStudents}>
          {/* <TopPositionSmall position={2} image={userIcon} />
          <TopPositionLarge position={1} image={userIcon} />
          <TopPositionSmall position={3} image={userIcon} /> */}
          {topThree.map((student, i) => {
            if (topThree.length === 1) {
              return (
                <TopPositionLarge
                  key={1}
                  position={1}
                  image={student.ProfilePicture}
                />
              );
            }
            let pos = i + 1;
            //adjust position for order of array (to display fist place in center)
            if (pos == 1)
              return (
                <TopPositionSmall
                  key={2}
                  position={2}
                  image={student.ProfilePicture}
                />
              );
            else if (pos == 2)
              return (
                <TopPositionLarge
                  key={1}
                  position={1}
                  image={student.ProfilePicture}
                />
              );
            else
              return (
                <TopPositionSmall
                  key={3}
                  position={3}
                  image={student.ProfilePicture}
                />
              );
          })}
        </View>
        <View style={styles.classList}>
          {students.map((student, i) => {
            if (i > 3) {
              return (
                <LeaderboardItem
                  key={i}
                  position={i}
                  name={student.FirstName}
                  level={student.Level}
                  xp={student.Xp}
                  userIcon={student.ProfilePicture}
                />
              );
            }
          })}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: "center",
  },
  topStudents: {
    width: "100%",
    // aspectRatio: 4 / 1,
    flexDirection: "row",
    alignItems: "baseline",
    justifyContent: "space-evenly",
    paddingVertical: 15,
    // backgroundColor: "gold",
  },
  topStudent: {
    borderRadius: 100,
    width: "25%",
    aspectRatio: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  first: {
    borderColor: "gold",
    borderRadius: 100,
    width: "35%",
    aspectRatio: 1,
  },
  userIcon: {
    height: "100%",
    position: "absolute",
  },
  topPosition: {
    width: "100%",
    position: "absolute",
    alignItems: "center",
    bottom: 0,
    // right: 0,
    transform: [{ translateY: 20 }],
  },
  topPositionBox: {
    backgroundColor: "silver",
    padding: 5,
    // paddingVertical: 10,
    borderRadius: 100,
    aspectRatio: 1,
    // minwidth: "20%",
    justifyContent: "center",
    alignItems: "center",
  },
  topPositionText: {
    fontWeight: "bold",
    color: colors.secondaryText,
  },
  classList: {
    borderColor: "red",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: "5%",
  },
});
