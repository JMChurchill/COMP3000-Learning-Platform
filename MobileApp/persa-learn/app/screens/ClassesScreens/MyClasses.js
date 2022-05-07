import {
  StyleSheet,
  View,
  ActivityIndicator,
  FlatList,
  RefreshControl,
} from "react-native";
import React, { useContext, useState, useEffect, useCallback } from "react";

import * as SecureStore from "expo-secure-store";
import { AuthContext } from "../../components/context";
import ClassesItem from "../../components/Classes/ClassesItem";
import { getClassesByStudent } from "../../httpRequests/classRequests";

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
                  key={item.ClassDetailsID}
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
};

export default MyClasses;

const styles = StyleSheet.create({});
