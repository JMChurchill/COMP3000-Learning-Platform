import * as SecureStore from "expo-secure-store";

export const getPurchasedProfilePictures = async () => {
  let token = await SecureStore.getItemAsync("userToken");
  const data = fetch("http://10.0.2.2:8080/profilePicture/purchased", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      autherization: token,
    },
  }).then((data) => data.json());
  return data;
};

export const updateProfilePicture = async (credentials) => {
  let token = await SecureStore.getItemAsync("userToken");
  const data = fetch("http://10.0.2.2:8080/student/profilePic", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      autherization: token,
    },
    body: JSON.stringify(credentials),
  }).then((data) => data.json());
  return data;
};

export const getPurchasedBanners = async () => {
  let token = await SecureStore.getItemAsync("userToken");
  const data = fetch("http://10.0.2.2:8080/banner/purchased", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      autherization: token,
    },
  }).then((data) => data.json());
  return data;
};

export const updateBanner = async (credentials) => {
  let token = await SecureStore.getItemAsync("userToken");
  const data = fetch("http://10.0.2.2:8080/student/banner", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      autherization: token,
    },
    body: JSON.stringify(credentials),
  }).then((data) => data.json());
  return data;
};
