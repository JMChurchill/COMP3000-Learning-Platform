//login //TODO: make use

export const loginUser = async (credentials, isTeacher) => {
  let url;
  if (isTeacher) {
    url = "http://localhost:8080/teacher/login";
  } else {
    url = "http://localhost:8080/student/login";
  }
  return fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  }).then(
    (data) => data.json()
    // (errorData) => {
    //   setError(errorData);
    // },
    // (response) => {
    //   setHttpResponseCode(response.status);
    // }
  );
};

export const getUserDetails = (token) => {
  return fetch("http://localhost:8080/student/details", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      autherization: token,
    },
  }).then((data) => data.json());
};

export const getUsersAssignments = () => {};
export const getStudentsClassses = () => {
  const token = JSON.parse(sessionStorage.getItem("token"));
  return fetch("http://localhost:8080/student/classes", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      autherization: token,
    },
  }).then((data) => data.json());
};
export const getStudentsInClass = (classID) => {
  console.log(JSON.stringify(classID));

  const token = JSON.parse(sessionStorage.getItem("token"));
  return fetch("http://localhost:8080/student/class", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      autherization: token,
    },
    body: JSON.stringify(classID),
  }).then((data) => data.json());
};
