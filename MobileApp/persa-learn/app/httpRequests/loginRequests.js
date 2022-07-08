import { checkTokenCorrect } from "./checkValidToken";
import { hostAddress } from "./hostAddress";

export const loginRequest = async (credentials) => {
  hostAddress();
  try {
    const data = fetch(`${hostAddress()}/student/login`, {
      // const data = fetch("http://localhost:8080/student/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    }).then((data) => data.json());
    checkTokenCorrect(data);

    return data;
  } catch (e) {}
};

export const registerRequest = async (credentials) => {
  console.log("jsonon", credentials);
  try {
    const data = fetch(`${hostAddress()}/student/create`, {
      // const data = fetch("http://localhost:8080/student/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    }).then((data) => data.json());
    checkTokenCorrect(data);

    return data;
  } catch (e) {}
};
