import * as SecureStore from "expo-secure-store";
import { checkTokenCorrect } from "./checkValidToken";
import { hostAddress } from "./hostAddress";

export const getBanners = async () => {
  try {
    let token = await SecureStore.getItemAsync("userToken");

    const data = fetch(`${hostAddress()}/banner`, {
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

    const data = fetch(`${hostAddress()}/profilePicture`, {
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

    const data = fetch(`${hostAddress()}/theme`, {
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
    const data = fetch(`${hostAddress()}/profilePicture/purchased`, {
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
    const data = fetch(`${hostAddress()}/banner/purchased`, {
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
    const data = fetch(`${hostAddress()}/theme/purchased`, {
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
