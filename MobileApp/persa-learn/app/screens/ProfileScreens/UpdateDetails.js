import { StyleSheet, Text, View } from "react-native";
import React from "react";
import fonts from "../../config/fonts";
import CustomInput from "../../components/CustomInput/CustomInput";
import { useForm } from "react-hook-form";
import CustomButton from "../../components/CustomButton/CustomButton";
import { updateStudentRequest } from "../../httpRequests/studentRequests";
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const UpdateDetails = ({ route, navigation }) => {
  const { control, handleSubmit, watch } = useForm();

  const { email, firstname, lastname } = route.params;

  const updateUser = async (credentials) => {
    try {
      const data = await updateStudentRequest(credentials);
      console.log("res", data);
      if (data.status === "success") {
        navigation.navigate("ProfileScreen");
      } else {
        alert("Something went wrong unable to change details");
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={fonts.title}>Update My Details</Text>
      <Text style={fonts.h1}>Email</Text>
      <CustomInput
        name="email"
        placeholder="Email"
        control={control}
        value={email}
        rules={{
          required: "Username is required",
          pattern: { value: EMAIL_REGEX, message: "Invalid email" },
        }}
      />
      <Text style={fonts.h1}>First name</Text>
      <CustomInput
        name="firstname"
        placeholder="firstname"
        control={control}
        value={firstname}
        rules={{ required: "First name is required" }}
      />

      <Text style={fonts.h1}>Last name</Text>
      <CustomInput
        name="lastname"
        placeholder="lastname"
        control={control}
        value={lastname}
        rules={{ required: "Last name is required" }}
      />
      <CustomButton
        text={"Update Details"}
        onPress={handleSubmit(updateUser)}
      />
    </View>
  );
};

export default UpdateDetails;

const styles = StyleSheet.create({
  container: { alignItems: "center", paddingHorizontal: 40, width: "100%" },
});
