import { StyleSheet, Text, View, ScrollView } from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useForm } from "react-hook-form";
import CustomInput from "../components/CustomInput/CustomInput";
import CustomButton from "../components/CustomButton/CustomButton";
import { registerRequest } from "../httpRequests/loginRequests";

// import {CustomInput} from ''

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function SignUpScreen(props) {
  // const [username, setUsername] = useState("");
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  // const [passwordRepeat, setPasswordRepeate] = useState("");

  const navigation = useNavigation();

  const { control, handleSubmit, watch } = useForm();

  const pwd = watch("password");

  const onRegisterPressed = async (credentials) => {
    try {
      const data = await registerRequest(credentials);
      console.log(data);
      if (data.status === "success") {
        alert("Account created");
        navigation.navigate("Login");
      } else if (data.status === "failure") {
        if (data.reason === "ER_DUP_ENTRY") {
          alert("This account already exists");
        }
      } else {
        alert("Failed to create user");
      }
    } catch (e) {
      console.log(e);
    }
    // console.warn("Registered");
    // navigation.navigate("Login");
  };

  const onTermsOfUsePressed = () => {
    console.warn("Terms of use");
  };
  const onSignInPressed = () => {
    navigation.navigate("Login");
  };

  return (
    <ScrollView>
      <View style={styles.root}>
        <Text style={styles.title}>Create an Account</Text>
        <CustomInput
          // value={username}
          // setValue={setUsername}
          name="firstname"
          placeholder="firstname"
          control={control}
          rules={{ required: "First name is required" }}
        />
        <CustomInput
          // value={username}
          // setValue={setUsername}
          name="lastname"
          placeholder="lastname"
          control={control}
          rules={{ required: "Last name is required" }}
        />
        <CustomInput
          // value={email}
          // setValue={setEmail}
          name="email"
          placeholder="Email"
          control={control}
          rules={{
            required: "Username is required",
            pattern: { value: EMAIL_REGEX, message: "Invalid email" },
          }}
        />
        <CustomInput
          // value={password}
          // setValue={setPassword}
          name="password"
          placeholder="Password"
          control={control}
          rules={{
            required: "Password is required",
            minLength: {
              value: 8,
              message: "Password should be atleast 8 characters long",
            },
          }}
          secureTextEntry={true}
        />
        <CustomInput
          // value={passwordRepeat}
          // setValue={setPasswordRepeate}
          name="passwordRepeat"
          placeholder="Repeat Password"
          control={control}
          rules={{
            required: "Password is required",
            validate: (value) => value == pwd || "Passwords do not match",
          }}
          secureTextEntry={true}
        />
        <CustomButton
          text="Register"
          onPress={handleSubmit(onRegisterPressed)}
        />

        <Text style={styles.text}>
          By Registering, you confirm to accept our
          <Text style={styles.link} onPress={onTermsOfUsePressed}>
            {" "}
            terms of use
          </Text>{" "}
          and
          <Text style={styles.link} onPress={onTermsOfUsePressed}>
            {" "}
            privacy policy
          </Text>
        </Text>

        <CustomButton
          text="Have an account? Sign in"
          onPress={onSignInPressed}
          type="TERTIARY"
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  root: {
    alignItems: "center",
    padding: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#051C60",
    margin: 10,
  },
  text: {
    color: "grey",
    marginVertical: 10,
  },
  link: {
    color: "#FDB075",
  },
});
