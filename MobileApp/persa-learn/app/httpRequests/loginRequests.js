export const loginRequest = async (credentials) => {
  try {
    const data = fetch("http://10.0.2.2:8080/student/login", {
      // const data = fetch("http://localhost:8080/student/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    }).then((data) => data.json());
    return data;
  } catch (e) {}
};

export const registerRequest = async (credentials) => {
  console.log("jsonon", credentials);
  try {
    const data = fetch("http://10.0.2.2:8080/student/create", {
      // const data = fetch("http://localhost:8080/student/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    }).then((data) => data.json());
    return data;
  } catch (e) {}
};
