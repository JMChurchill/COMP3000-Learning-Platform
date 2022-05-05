import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  RefreshControl,
} from "react-native";
import React, { useState, useCallback, useEffect, useContext } from "react";
import * as SecureStore from "expo-secure-store";

import fonts from "../config/fonts";
import common from "../config/common";
import colors from "../config/colors";

import AssignmentItem from "../components/Assignments/AssignmentItem";
import { getAssignmentsByStudent } from "../httpRequests/assignmentRequests";
import { useIsFocused } from "@react-navigation/native";
import { AuthContext } from "../components/context";

export default function AssignmentsScreen() {
  const { signOut } = useContext(AuthContext);

  // const [isLoading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const isFocused = useIsFocused();

  const onRefresh = useCallback(async () => {
    await getData();
  }, []);

  useEffect(async () => {
    await getData();
    if ((await SecureStore.getItemAsync("userToken")) === null) {
      signOut();
    }
  }, [isFocused]);

  const getData = async () => {
    try {
      setRefreshing(true);
      let data = await getAssignmentsByStudent();
      // console.log(data);
      if (data.status === "success") {
        console.log(data.quizzes);
        await setData(data.quizzes);
        setRefreshing(false);
      }
    } catch (e) {}
  };

  // { height: height * 0.2 + height * 0.07 }
  return (
    // <ScrollView>
    <View style={styles.root}>
      <View style={styles.content}>
        {false ? (
          <ActivityIndicator size="large" color={colors.primary} />
        ) : (
          <View>
            <FlatList
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }
              data={data}
              keyExtractor={({ id }, index) => id}
              renderItem={({ item, separator }) => {
                return (
                  <AssignmentItem
                    key={item.QuizID}
                    id={item.QuizID}
                    title={item.QuizName}
                    cName={item.ModuleName}
                    dueDate={item.DueDate}
                  />
                );
              }}
            />
          </View>
        )}
      </View>
    </View>
    // </ScrollView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: "center",
  },
  container: {
    alignItems: "center",
    borderWidth: 1,
    // backgroundColor: "orange",
    // justifyContent: "center",
  },

  title: fonts.title,
  content: {
    flex: 1,
    width: "100%",
    // paddingHorizontal: "5%",
    padding: 10,
  },
});
