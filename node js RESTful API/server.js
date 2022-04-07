if (process.env.NODE_ENV != "production") {
  const dotenv = require("dotenv").config({ path: "./.env" });
}

const cookieParser = require("cookie-parser");
const express = require("express");

const studentRouter = require("./routes/studentRoutes");
const teacherRouter = require("./routes/teacherRoutes");
const assignmentsRouter = require("./routes/assignmentsRoutes");
const classesRouter = require("./routes/classRoutes");
const moduleRouter = require("./routes/moduleRoutes");
const quizRouter = require("./routes/ActivityRoutes/quizRoutes");
const flashcardRouter = require("./routes/ActivityRoutes/flashcardRoutes");

const cors = require("cors");

const app = express();

// const corsOptions = {
//   origin: true, //included origin as true
//   credentials: true, //included credentials as true
// };

//middleware
// app.use(cookieParser());
app.use(express.json());
if (process.env.NODE_ENV != "production") {
  app.use(cors());
}
// app.use(cors(corsOptions));

//redirect requests to endpoint starting with /posts to postRoutes.js
app.use("/student", studentRouter);
app.use("/teacher", teacherRouter);
app.use("/assignments", assignmentsRouter);
app.use("/classes", classesRouter);
app.use("/module", moduleRouter);
app.use("/quiz", quizRouter);
app.use("/decks", flashcardRouter);

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`API started on port: ${port}`);
});

app.get("/", async (req, res) => {
  res.json({ status: "Ready" });
});
