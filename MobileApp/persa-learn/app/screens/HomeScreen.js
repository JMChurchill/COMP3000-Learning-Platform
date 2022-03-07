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
import fonts from "../config/fonts";

import UserIcon from "../assets/UserIcons/001-man-1.png";
import Banner from "../assets/Banners/banner-1.jpg";
import colors from "../config/colors";

export default function HomeScreen() {
  // const [isLoading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const listItemOnPress = (id) => {
    console.log("pressed ", id);
  };

  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    const retrievedData = [
      { id: 1, title: "assignment2", DueDate: "10/2/22" },
      { id: 2, title: "assignment2", DueDate: "10/2/22" },
      { id: 3, title: "assignment2", DueDate: "10/2/22" },
      { id: 4, title: "assignment2", DueDate: "10/2/22" },
      { id: 5, title: "assignment2", DueDate: "10/2/22" },
      { id: 6, title: "assignment2", DueDate: "10/2/22" },
      { id: 7, title: "assignment2", DueDate: "10/2/22" },
      { id: 8, title: "assignment2", DueDate: "10/2/22" },
      { id: 9, title: "assignment2", DueDate: "10/2/22" },
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
      { id: 1, title: "assignment1", DueDate: "10/2/22" },
      { id: 2, title: "assignment2", DueDate: "10/2/22" },
      { id: 3, title: "assignment3", DueDate: "10/2/22" },
    ];
    await wait(1000).then(() => setRefreshing(false));
    await setData(retrievedData);
  };

  const { height } = useWindowDimensions();
  const navigation = useNavigation();
  // { height: height * 0.2 + height * 0.07 }
  return (
    // <ScrollView>
    <View style={styles.root}>
      <View style={[styles.container]}>
        <View style={[styles.userIconContainer]}>
          <Image
            source={UserIcon}
            style={{ height: height * 0.15 }}
            resizeMode={"contain"}
          />
          <Text style={styles.xp}>Lv10</Text>
        </View>
        <Image
          source={Banner}
          style={[styles.banner, { height: height * 0.2 }]}
          resizeMode={"contain"}
        />
      </View>
      <Text style={styles.title}>Students Name</Text>
      <View style={styles.content}>
        {false ? (
          <ActivityIndicator size="large" color={colors.primary} />
        ) : (
          <View>
            {/* Title from URL */}
            {/* <Text style={styles.title}>{title}</Text> */}
            {/* Display each movie */}
            {/* <View style={{ borderBottomWidth: 1, marginBottom: 12 }}></View> */}
            <FlatList
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }
              data={data}
              keyExtractor={({ id }, index) => id}
              renderItem={({ item, separator }) => (
                <TouchableOpacity
                  style={styles.listItem}
                  onPress={() => listItemOnPress(item.id)}
                >
                  <Text style={styles.listItemText}>{item.id}.</Text>
                  <Text style={styles.listItemText}>{item.title},</Text>
                  <Text style={styles.listItemText}>{item.DueDate}</Text>
                </TouchableOpacity>
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
  userIconContainer: {
    // alignSelf: "flex-start",
    // position: "absolute",
    // width: 100,
    // height: 100,
    // borderColor: "blue",
    // borderWidth: 1,
    alignItems: "center",
    zIndex: 1,
    marginTop: 40,
  },
  banner: {
    position: "absolute",
    zIndex: 0,
  },
  xp: {
    backgroundColor: "#fff",
    paddingHorizontal: 10,
    borderRadius: 10,
    fontSize: 18,
    fontWeight: "bold",
    transform: [{ translateY: -10 }],
    //shadow
    //android
    elevation: 5,
    //ios
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
  },

  title: fonts.title,
  content: {
    flex: 1,
    width: "100%",
    paddingHorizontal: "5%",
    borderColor: "orange",
    borderWidth: 5,
  },
  listItem: {
    borderColor: "grey",
    borderBottomWidth: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 10,
    marginVertical: 2,
  },
  listItemText: {
    fontSize: 20,
  },
});
