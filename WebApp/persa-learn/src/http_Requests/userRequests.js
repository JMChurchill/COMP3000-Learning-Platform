export const checkTokenCorrect = (status) => {
  status.then((value) => {
    // console.log(value.errors[0].message);
    // ask to log back in if token invalid
    if (
      value.hasOwnProperty("errors") &&
      value.errors[0].message === "Invalid Token"
    ) {
      sessionStorage.clear();
      window.location.reload();
    }
  });
};

export const loginUser = async (credentials, isTeacher, isAdmin) => {
  let url;
  if (isAdmin) {
    url = "http://localhost:8080/admin/login";
  } else if (isTeacher) {
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
  }).then((data) => data.json());
};

export const signUpUser = (credentials, isTeacher) => {
  let url;
  if (isTeacher) {
    url = "http://localhost:8080/teacher/create";
  } else {
    url = "http://localhost:8080/student/create";
  }
  return fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  }).then((data) => data.json());
};

export const getUserDetails = () => {
  const token = JSON.parse(sessionStorage.getItem("token"));
  const data = fetch("http://localhost:8080/student/details", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      autherization: token,
    },
  }).then((data) => data.json());
  checkTokenCorrect(data);
  return data;
};

export const getStudentsAssignmentQuizzes = () => {
  const token = JSON.parse(sessionStorage.getItem("token"));
  // const data = fetch("http://localhost:8080/student/assignments/quizzes", {
  const data = fetch("http://localhost:8080/assignments/quizzes", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      autherization: token,
    },
  }).then((data) => data.json());

  checkTokenCorrect(data);
  return data;
};

export const getStudentsClassses = () => {
  const token = JSON.parse(sessionStorage.getItem("token"));
  // const data = fetch("http://localhost:8080/student/classes", {
  const data = fetch("http://localhost:8080/classes/student", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      autherization: token,
    },
  }).then((data) => data.json());

  checkTokenCorrect(data);
  return data;
  // return data;
};
export const getStudentsInClass = (classID) => {
  // console.log(JSON.stringify(classID));
  console.log(classID);

  const token = JSON.parse(sessionStorage.getItem("token"));
  const data = fetch("http://localhost:8080/student/class", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      autherization: token,
    },
    body: JSON.stringify(classID),
  }).then((data) => data.json());
  checkTokenCorrect(data);
  return data;
};

export const getQuiz = (quizID) => {
  const token = JSON.parse(sessionStorage.getItem("token"));
  const data = fetch(`http://localhost:8080/quiz/view?quizID=${quizID}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      autherization: token,
    },
  }).then((data) => data.json());
  checkTokenCorrect(data);
  return data;
};

export const checkAnswers = (credentials) => {
  const token = JSON.parse(sessionStorage.getItem("token"));
  const data = fetch(`http://localhost:8080/quiz/checkAnswers`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      autherization: token,
    },
    body: JSON.stringify(credentials),
  }).then((data) => data.json());
  checkTokenCorrect(data);
  return data;
};
