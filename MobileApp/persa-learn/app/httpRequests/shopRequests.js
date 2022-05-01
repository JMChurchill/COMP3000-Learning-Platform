import * as SecureStore from "expo-secure-store";

export const getBanners = async () => {
  let token = await SecureStore.getItemAsync("userToken");

  const data = fetch("http://10.0.2.2:8080/banner", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      autherization: token,
    },
  }).then((data) => data.json());
  return data;
};

export const getProfilePics = async () => {
  let token = await SecureStore.getItemAsync("userToken");

  const data = fetch("http://10.0.2.2:8080/profilePicture", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      autherization: token,
    },
  }).then((data) => data.json());
  return data;
};

export const getThemes = async () => {
  let token = await SecureStore.getItemAsync("userToken");

  const data = fetch("http://10.0.2.2:8080/theme", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      autherization: token,
    },
  }).then((data) => data.json());
  return data;
};

export const purchaseProfilePic = async (credentials) => {
  let token = await SecureStore.getItemAsync("userToken");
  const data = fetch("http://10.0.2.2:8080/profilePicture/purchased", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      autherization: token,
    },
    body: JSON.stringify(credentials),
  }).then((data) => data.json());
  return data;
};

export const purchaseBanner = async (credentials) => {
  let token = await SecureStore.getItemAsync("userToken");
  const data = fetch("http://10.0.2.2:8080/banner/purchased", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      autherization: token,
    },
    body: JSON.stringify(credentials),
  }).then((data) => data.json());
  return data;
};

export const purchaseTheme = async (credentials) => {
  let token = await SecureStore.getItemAsync("userToken");
  const data = fetch("http://10.0.2.2:8080/theme/purchased", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      autherization: token,
    },
    body: JSON.stringify(credentials),
  }).then((data) => data.json());
  return data;
};
