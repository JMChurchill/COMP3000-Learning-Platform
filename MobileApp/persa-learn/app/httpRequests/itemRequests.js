import * as SecureStore from "expo-secure-store";
import { checkTokenCorrect } from "./checkValidToken";

export const getPurchasedProfilePictures = async () => {
  try {
    let token = await SecureStore.getItemAsync("userToken");
    const data = fetch("http://10.0.2.2:8080/profilePicture/purchased", {
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

export const updateProfilePicture = async (credentials) => {
  try {
    let token = await SecureStore.getItemAsync("userToken");
    const data = fetch("http://10.0.2.2:8080/student/profilePic", {
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

export const getPurchasedBanners = async () => {
  try {
    let token = await SecureStore.getItemAsync("userToken");
    const data = fetch("http://10.0.2.2:8080/banner/purchased", {
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

export const updateBanner = async (credentials) => {
  try {
    let token = await SecureStore.getItemAsync("userToken");
    const data = fetch("http://10.0.2.2:8080/student/banner", {
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
