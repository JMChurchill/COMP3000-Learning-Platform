import { StyleSheet, Text, View, FlatList, RefreshControl } from "react-native";
import React, { useState, useCallback, useEffect, useContext } from "react";
import AssignmentItem from "../../components/Assignments/AssignmentItem";
import colors from "../../config/colors";
import ClassesItem from "../../components/Classes/ClassesItem";
import ResultItem from "../../components/Feed/ResultItem";
import SharedItem from "../../components/Feed/SharedItem";
import * as SecureStore from "expo-secure-store";
import { AuthContext } from "../../components/context";
import { getFeedRequest } from "../../httpRequests/feedRequests";

export default function FeedScreen() {
  const { signOut } = useContext(AuthContext);

  // const [isLoading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };

  const onRefresh = useCallback(async () => {
    await getData();
  }, []);

  useEffect(async () => {
    await getData();
    if ((await SecureStore.getItemAsync("userToken")) === null) {
      signOut();
    }
  }, []);

  const getData = async () => {
    setRefreshing(true);
    const data = await getFeedRequest();
    if (data.status === "success") {
      await setData(data.data);
    }
    setRefreshing(false);
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
                if (item.Caption === "Assignment") {
                  return (
                    <AssignmentItem
                      key={item.QuizID}
                      id={item.QuizID}
                      title={item.QuizName}
                      cName={item.className}
                      dueDate={item.DueDate}
                    />
                  );
                } else if (item.Caption === "Submission") {
                  return (
                    <ResultItem
                      key={item.QuizID}
                      id={item.QuizID}
                      sName={`${item.firstname} ${item.lastname}`}
                      score={item.score}
                      total={item.Total}
                      aName={item.QuizName}
                      profilePicture={item.profilePicture}
                    />
                  );
                } else if (item.type === "shared") {
                  return (
                    <SharedItem
                      key={item.id}
                      id={item.id}
                      sName={`${item.firstName} ${item.lastName}`}
                      iName={item.itemName}
                    />
                  );
                }
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
  content: {
    // flex: 1,
    // width: "100%",
    // paddingHorizontal: "5%",
    // borderColor: "orange",
    // borderWidth: 5,
    padding: 10,
  },
});
