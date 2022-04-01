import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  RefreshControl,
} from "react-native";
import React, { useState, useCallback, useEffect } from "react";

import fonts from "../config/fonts";
import common from "../config/common";
import colors from "../config/colors";

import AssignmentItem from "../components/Assignments/AssignmentItem";

export default function AssignmentsScreen() {
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
      },
      { id: 2, title: "assignment2", class: "art", DueDate: "10/2/22" },
      {
        id: 3,
        title: "Moments",
        class: "Physics 03",
        DueDate: "10/2/22",
      },
      {
        id: 4,
        title: "Trig",
        class: "Maths 01",
        DueDate: "10/2/22",
      },
    ];
    await wait(1000).then(() => setRefreshing(false));
    await setData(retrievedData);
  }, []);

  useEffect(async () => {
    await getData();
  }, []);

  const getData = async () => {
    setRefreshing(true);
    const retrievedData = [
      {
        id: 1,
        title: "assignment1",
        class: "Maths 01",
        DueDate: "10/1/22",
      },
      { id: 2, title: "assignment2", class: "art", DueDate: "10/2/22" },
      {
        id: 3,
        title: "Moments",
        class: "Physics 03",
        DueDate: "10/2/22",
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
              renderItem={({ item, separator }) => (
                <AssignmentItem
                  id={item.id}
                  title={item.title}
                  cName={item.class}
                  dueDate={item.DueDate}
                />
              )}
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
    borderColor: "red",
    borderWidth: 1,
    // backgroundColor: "orange",
    // justifyContent: "center",
  },

  title: fonts.title,
  content: {
    flex: 1,
    width: "100%",
    // paddingHorizontal: "5%",
    borderColor: "orange",
    borderWidth: 5,
    padding: 10,
  },
});
