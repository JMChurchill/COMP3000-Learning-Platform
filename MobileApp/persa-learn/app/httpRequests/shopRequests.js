import * as SecureStore from "expo-secure-store";
import { checkTokenCorrect } from "./checkValidToken";

export const getBanners = async () => {
  try {
    let token = await SecureStore.getItemAsync("userToken");

    const data = fetch("http://10.0.2.2:8080/banner", {
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

export const getProfilePics = async () => {
  try {
    let token = await SecureStore.getItemAsync("userToken");

    const data = fetch("http://10.0.2.2:8080/profilePicture", {
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

export const getThemes = async () => {
  try {
    let token = await SecureStore.getItemAsync("userToken");

    const data = fetch("http://10.0.2.2:8080/theme", {
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

export const purchaseProfilePic = async (credentials) => {
  try {
    let token = await SecureStore.getItemAsync("userToken");
    const data = fetch("http://10.0.2.2:8080/profilePicture/purchased", {
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

export const purchaseBanner = async (credentials) => {
  try {
    let token = await SecureStore.getItemAsync("userToken");
    const data = fetch("http://10.0.2.2:8080/banner/purchased", {
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

export const purchaseTheme = async (credentials) => {
  try {
    let token = await SecureStore.getItemAsync("userToken");
    const data = fetch("http://10.0.2.2:8080/theme/purchased", {
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
