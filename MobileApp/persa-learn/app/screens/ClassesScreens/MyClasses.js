import {
  StyleSheet,
  View,
  ActivityIndicator,
  FlatList,
  RefreshControl,
  Text,
} from "react-native";
import React, { useContext, useState, useEffect, useCallback } from "react";

import * as SecureStore from "expo-secure-store";
import { AuthContext } from "../../components/context";
import ClassesItem from "../../components/Classes/ClassesItem";
import { getClassesByStudent } from "../../httpRequests/classRequests";
import fonts from "../../config/fonts";

const MyClasses = () => {
  const { signOut } = useContext(AuthContext);

  const [classes, setClasses] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(async () => {
    await getData();
    if ((await SecureStore.getItemAsync("userToken")) === null) {
      signOut();
    }
  }, []);

  const getData = async () => {
    try {
      setRefreshing(true);
      const data = await getClassesByStudent();
      if (data.status === "success") {
        setClasses(data.data);
      }
      setRefreshing(false);
    } catch (e) {}
  };

  const onRefresh = useCallback(async () => {
    await getData();
  }, []);
  return (
    <View style={styles.root}>
      {false ? (
        <ActivityIndicator size="large" color={colors.primary} />
      ) : (
        <>
          <Text style={fonts.title}>My Classes</Text>

          <FlatList
            style={styles.allClassesContainer}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            data={classes}
            keyExtractor={({ id }, index) => id}
            renderItem={({ item, separator }) => (
              <ClassesItem
                key={item.ClassDetailsID}
                id={item.ClassDetailsID}
                name={item.Name}
                teacher={`${item.FirstName} ${item.LastName}`}
              />
            )}
          />
        </>
      )}
    </View>
  );
};

export default MyClasses;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: "center",
    padding: 0,
  },
  container: {
    flex: 1,
    margin: 0,
    width: "100%",
  },
  allClassesContainer: {
    width: "100%",
    // paddingHorizontal: 5,
  },
});
