import * as SecureStore from "expo-secure-store";
import { checkTokenCorrect } from "./checkValidToken";
import { hostAddress } from "./hostAddress";

export const getClassRequests = async () => {
  try {
    let token = await SecureStore.getItemAsync("userToken");

    const data = fetch(`${hostAddress()}/classRequests/student`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        autherization: token,
      },
    }).then((data) => data.json());
    checkTokenCorrect(data);

    return data;
  } catch (e) {}
};

export const acceptClassRequests = async (credentials) => {
  try {
    let token = await SecureStore.getItemAsync("userToken");

    const data = fetch(`${hostAddress()}/classRequests/student`, {
      method: "POST",
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

export const declineClassRequests = async (credentials) => {
  try {
    let token = await SecureStore.getItemAsync("userToken");

    const data = fetch(`${hostAddress()}/classRequests/student`, {
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
