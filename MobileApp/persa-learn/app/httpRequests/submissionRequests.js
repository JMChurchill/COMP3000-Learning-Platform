import * as SecureStore from "expo-secure-store";
import { checkTokenCorrect } from "./checkValidToken";

export const shareSubmission = async (credentials) => {
  try {
    let token = await SecureStore.getItemAsync("userToken");

    const data = fetch("http://10.0.2.2:8080/submission", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        autherization: token,
      },
      body: JSON.stringify(credentials),
    }).then((data) => data.json());
    checkTokenCorrect(data);
    return data;
  } catch (e) {}
};

export const unshareSubmission = async (credentials) => {
  try {
    let token = await SecureStore.getItemAsync("userToken");

    const data = fetch("http://10.0.2.2:8080/submission", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        autherization: token,
      },
      body: JSON.stringify(credentials),
    }).then((data) => data.json());
    checkTokenCorrect(data);
    return data;
  } catch (e) {}
};
