import { StyleSheet, Text, View, FlatList, RefreshControl } from "react-native";
import React, { useState, useCallback, useEffect, useContext } from "react";
import AssignmentItem from "../../components/Assignments/AssignmentItem";
import colors from "../../config/colors";
import ClassesItem from "../../components/Classes/ClassesItem";
import ResultItem from "../../components/Feed/ResultItem";
import SharedItem from "../../components/Feed/SharedItem";
import * as SecureStore from "expo-secure-store";
import { AuthContext } from "../../components/context";

export default function FeedScreen() {
  const { signOut } = useContext(AuthContext);

  // const [isLoading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    const retrievedData = [
      {
        id: 1,
        title: "assignment1",
        class: "Maths 01",
        DueDate: "10/1/22",
        type: "assignment",
      },
      { id: 2, name: "maths", teacher: "Mary", type: "class" },
      {
        id: 3,
        title: "Moments",
        class: "Physics 03",
        DueDate: "10/2/22",
        type: "assignment",
      },
      {
        id: 4,
        firstName: "James",
        lastName: "John",
        score: "10/10",
        assignmentName: "Algibra",
        type: "result",
      },
      {
        id: 5,
        firstName: "Bobby",
        lastName: "Smith",
        itemName: "flashcards",
        type: "shared",
      },
    ];
    await wait(1000).then(() => setRefreshing(false));
    await setData(retrievedData);
  }, []);

  useEffect(async () => {
    await getData();
    if ((await SecureStore.getItemAsync("userToken")) === null) {
      signOut();
    }
  }, []);

  const getData = async () => {
    setRefreshing(true);
    const retrievedData = [
      {
        id: 1,
        title: "assignment1",
        class: "Maths 01",
        DueDate: "10/1/22",
        type: "assignment",
      },
      { id: 2, name: "maths", teacher: "Mary", type: "class" },
      {
        id: 3,
        title: "Moments",
        class: "Physics 03",
        DueDate: "10/2/22",
        type: "assignment",
      },
      {
        id: 4,
        firstName: "James",
        lastName: "John",
        score: "10/10",
        assignmentName: "Algibra",
        type: "result",
      },
      {
        id: 5,
        firstName: "Bobby",
        lastName: "Smith",
        itemName: "flashcards",
        type: "shared",
      },
    ];
    await wait(1000).then(() => setRefreshing(false));
    await setData(retrievedData);
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
                if (item.type === "assignment") {
                  return (
                    <AssignmentItem
                      key={item.id}
                      id={item.id}
                      title={item.title}
                      cName={item.class}
                      dueDate={item.DueDate}
                    />
                  );
                } else if (item.type === "class") {
                  return (
                    <ClassesItem
                      key={item.id}
                      id={item.id}
                      name={item.name}
                      teacher={item.teacher}
                    />
                  );
                } else if (item.type === "result") {
                  return (
                    <ResultItem
                      key={item.id}
                      id={item.id}
                      sName={`${item.firstName} ${item.lastName}`}
                      score={item.score}
                      aName={item.assignmentName}
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
