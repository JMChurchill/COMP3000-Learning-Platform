import * as SecureStore from "expo-secure-store";

export const getClassesByStudent = async () => {
  let token = await SecureStore.getItemAsync("userToken");

  const data = fetch("http://10.0.2.2:8080/classes/student", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      autherization: token,
    },
  }).then((data) => data.json());
  return data;
};

export const getStudentsByClass = async (credentials) => {
  let token = await SecureStore.getItemAsync("userToken");

  const data = fetch("http://10.0.2.2:8080/student/class", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      autherization: token,
    },
    body: JSON.stringify(credentials),
  }).then((data) => data.json());
  return data;
};
