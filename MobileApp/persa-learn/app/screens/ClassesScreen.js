import {
  StyleSheet,
  Text,
  View,
  Image,
  useWindowDimensions,
  ActivityIndicator,
  FlatList,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect, useCallback } from "react";
import { useNavigation } from "@react-navigation/native";
import common from "../config/common";
import colors from "../config/colors";
import ClassesItem from "../components/Classes/ClassesItem";
import { getClassesByStudent } from "../httpRequests/classRequests";

export default function ClassesScreen() {
  const [classes, setClasses] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(async () => {
    await getData();
  }, []);
  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };

  const getData = async () => {
    setRefreshing(true);
    const data = await getClassesByStudent();
    console.log(data);
    if (data.status === "success") {
      alert("suc");
      setClasses(data.data);
    }
    setRefreshing(false);
    // const retrievedData = [
    //   { id: 1, class: "maths", teacher: "Mary" },
    //   { id: 2, class: "science", teacher: "John" },
    //   { id: 3, class: "english", teacher: "Phil" },
    // ];
    // await wait(1000).then(() => setRefreshing(false));
    // await setClasses(retrievedData);
  };

  const onRefresh = useCallback(async () => {
    await getData();
    // setRefreshing(true);
    // const retrievedData = [
    //   { id: 1, class: "maths", teacher: "Mary" },
    //   { id: 2, class: "science", teacher: "John" },
    //   { id: 3, class: "english", teacher: "Phil" },
    //   { id: 4, class: "art", teacher: "Mary2" },
    //   { id: 5, class: "DT", teacher: "John2" },
    //   { id: 6, class: "Geography", teacher: "Phil2" },
    // ];
    // await wait(1000).then(() => setRefreshing(false));
    // await setClasses(retrievedData);
  }, []);

  return (
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
              data={classes}
              keyExtractor={({ id }, index) => id}
              renderItem={({ item, separator }) => (
                <ClassesItem
                  id={item.ClassDetailsID}
                  name={item.Name}
                  teacher={`${item.FirstName} ${item.LastName}`}
                />
              )}
            />
          </View>
        )}
      </View>
    </View>
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
  content: {
    flex: 1,
    width: "100%",
    padding: 10,
  },
});
