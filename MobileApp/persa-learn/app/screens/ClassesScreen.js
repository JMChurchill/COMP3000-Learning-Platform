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
import React, { useState, useEffect, useCallback, useContext } from "react";
import { useNavigation } from "@react-navigation/native";
import common from "../config/common";
import colors from "../config/colors";
import ClassesItem from "../components/Classes/ClassesItem";
import { getClassesByStudent } from "../httpRequests/classRequests";
import * as SecureStore from "expo-secure-store";
import { AuthContext } from "../components/context";

export default function ClassesScreen() {
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
