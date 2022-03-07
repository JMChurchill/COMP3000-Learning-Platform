import { StyleSheet, Text, View, TextInput } from "react-native";
import React from "react";
import { Controller } from "react-hook-form";
import common from "../../config/common";

export default function CustomInput({
  // value,
  // setValue,
  control,
  name,
  rules = {},
  placeholder,
  secureTextEntry = false,
}) {
  return (
    // <View style={styles.container}>
    // {/* <TextInput
    //   placeholder={placeholder}
    //   style={styles.input}
    //   value={value}
    //   onChangeText={setValue}
    //   secureTextEntry={secureTextEntry}
    // /> */}

    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({
        field: { value, onChange, onBlur },
        fieldState: { error },
      }) => (
        <>
          <View
            style={[
              styles.container,
              { borderColor: error ? "red" : "#e8e8e8" },
            ]}
          >
            <TextInput
              style={styles.input}
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              placeholder={placeholder}
              secureTextEntry={secureTextEntry}
            />
          </View>
          {error && (
            <Text style={{ color: "red", alignSelf: "stretch" }}>
              {error.message || "Error"}
            </Text>
          )}
          {/* <Text style={{ color: "red", alignSelf: "stretch" }}>Error</Text> */}
        </>
      )}
    />
    // </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    width: "100%",
    borderColor: "#e8e8e8",
    borderWidth: 1,
    borderRadius: common.containerBorderRadius,

    paddingVertical: 5,
    paddingHorizontal: 10,
    marginVertical: 5,
  },
  input: {},
});
