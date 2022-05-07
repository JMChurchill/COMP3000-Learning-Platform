import { checkTokenCorrect } from "../userRequests";

export const getAllAssignmentProgress = () => {
  const token = JSON.parse(sessionStorage.getItem("token"));
  const data = fetch("http://localhost:8080/tstats/assignment/Progress", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      autherization: token,
    },
  }).then((data) => data.json());
  checkTokenCorrect(data);
  return data;
};

export const getAllAssignmentRatings = () => {
  const token = JSON.parse(sessionStorage.getItem("token"));
  const data = fetch("http://localhost:8080/tstats/assignment/Rating", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      autherization: token,
    },
  }).then((data) => data.json());
  checkTokenCorrect(data);
  return data;
};
