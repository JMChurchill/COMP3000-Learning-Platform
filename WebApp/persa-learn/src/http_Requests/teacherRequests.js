export const getTeachersClasses = () => {
  const token = JSON.parse(sessionStorage.getItem("token"));

  return fetch("http://localhost:8080/teacher/classes", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      autherization: token,
    },
  }).then((data) => data.json());
};
