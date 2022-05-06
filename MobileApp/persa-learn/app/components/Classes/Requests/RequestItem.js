import { StyleSheet, Text, View } from "react-native";
import React from "react";
import CustomButton from "../../CustomButton/CustomButton";
import colors from "../../../config/colors";
import common from "../../../config/common";
import fonts from "../../../config/fonts";
import {
  acceptClassRequests,
  declineClassRequests,
} from "../../../httpRequests/classRequestRequests";

const RequestItem = ({
  id,
  className,
  yearGroup,
  firstname,
  lastname,
  dateSent,
  getAllRequests,
  getAllClasses,
}) => {
  const accept = async () => {
    const data = await acceptClassRequests({ classID: id });
    console.log(data);
    if (data.status === "success") {
      getAllRequests();
      //   getAllClasses();
    }
  };
  const decline = async () => {
    const data = await declineClassRequests({ classID: id });
    console.log(data);
    if (data.status === "success") {
      getAllRequests();
    }
  };
  return (
    <View style={[styles.container, common.shadow]}>
      <View style={styles.details}>
        <View style={styles.row}>
          <Text style={[fonts.h2, { width: "50%" }]}>{className}</Text>
          <Text style={[fonts.h2, { width: "50%" }]}>{yearGroup}</Text>
        </View>
        <View style={styles.row}>
          <Text
            style={[fonts.h2, { width: "50%" }]}
          >{`${firstname} ${lastname}`}</Text>
          <Text style={[fonts.h2, { width: "50%" }]}>
            {dateSent ? new Date(dateSent).toLocaleDateString("en-GB") : ""}
          </Text>
        </View>
      </View>
      <CustomButton text={"Accept"} onPress={accept} />
      <CustomButton text={"Decline"} type={"SECONDARY"} onPress={decline} />
    </View>
  );
};

export default RequestItem;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.cardBackground,
    borderRadius: common.containerBorderRadius,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    margin: 10,
  },
  details: {},
  row: {
    width: "100%",
    flexDirection: "row",
    margin: 10,
    paddingHorizontal: 10,
    justifyContent: "space-evenly",
  },
});
