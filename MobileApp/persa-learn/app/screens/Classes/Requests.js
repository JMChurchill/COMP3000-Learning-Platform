import { StyleSheet, Text, View, ScrollView } from "react-native";
import React, { useState, useEffect } from "react";
import fonts from "../../config/fonts";
import RequestItem from "../../components/Classes/Requests/RequestItem";
import { getClassRequests } from "../../httpRequests/classRequestRequests";
import { useIsFocused } from "@react-navigation/native";

const Requests = () => {
  const [allRequests, setAllRequests] = useState([1, 1, 1, 1]);
  const getAllRequests = async () => {
    const requestData = await getClassRequests();
    console.log(requestData);
    if (requestData.hasOwnProperty("data")) {
      setAllRequests(requestData.data);
    }
  };
  const isFocused = useIsFocused();

  useEffect(async () => {
    await getAllRequests();
  }, [isFocused]);
  return (
    <ScrollView>
      <View style={styles.root}>
        <Text style={fonts.title}>Class Requests</Text>
        <View style={styles.requestsContainer}>
          {allRequests.map((request) => (
            <RequestItem
              key={request.ClassDetailsID}
              id={request.ClassDetailsID}
              className={request.ClassName}
              firstname={request.FirstName}
              lastname={request.LastName}
              dateSent={request.DateSent}
              yearGroup={request.YearGroup}
              getAllRequests={getAllRequests}
              //   getAllClasses={getAllClasses}
            />
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

export default Requests;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: "center",
  },
  requestsContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: "90%",
  },
});
