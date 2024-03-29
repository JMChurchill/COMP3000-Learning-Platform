import * as SecureStore from "expo-secure-store";
import { checkTokenCorrect } from "./checkValidToken";
import { hostAddress } from "./hostAddress";

export const detailsStudentRequest = async () => {
  //   console.log("aa");
  try {
    let token = await SecureStore.getItemAsync("userToken");
    // await SecureStore.deleteItemAsync("userToken");

    // console.log("t: ", token);
    const data = fetch(`${hostAddress()}/student/details`, {
      // const data = fetch("http://localhost:8080/student/login", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        autherization: token,
      },
    }).then((data) => data.json());
    checkTokenCorrect(data);

    return data;
  } catch (e) {}
};
export const updateStudentRequest = async (credentials) => {
  try {
    let token = await SecureStore.getItemAsync("userToken");
    const data = fetch(`${hostAddress()}/student`, {
      // const data = fetch("http://localhost:8080/student/login", {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        autherization: token,
      },
      body: JSON.stringify(credentials),
    }).then((data) => data.json());
    checkTokenCorrect(data);

    return data;
  } catch (e) {}
};

export const changePasswordRequest = async (credentials) => {
  try {
    let token = await SecureStore.getItemAsync("userToken");
    const data = fetch(`${hostAddress()}/student/update/password`, {
      // const data = fetch("http://localhost:8080/student/login", {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        autherization: token,
      },
      body: JSON.stringify(credentials),
    }).then((data) => data.json());
    checkTokenCorrect(data);

    return data;
  } catch (e) {}
};

export const deleteStudentRequest = async () => {
  try {
    let token = await SecureStore.getItemAsync("userToken");
    let data = fetch(`${hostAddress()}/student`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        autherization: token,
      },
    }).then((data) => data.json());
    checkTokenCorrect(data);

    return data;
  } catch (e) {}
};
