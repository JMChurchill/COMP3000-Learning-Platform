if (process.env.NODE_ENV != "production") {
  const dotenv = require("dotenv").config({ path: "./.env" });
}

const cookieParser = require("cookie-parser");
const express = require("express");

const studentRouter = require("./routes/studentRoutes");
const teacherRouter = require("./routes/teacherRoutes");
const adminRouter = require("./routes/adminRoutes");
const assignmentsRouter = require("./routes/assignmentsRoutes");
const classesRouter = require("./routes/classRoutes");
const moduleRouter = require("./routes/moduleRoutes");
const quizRouter = require("./routes/ActivityRoutes/quizRoutes");
const flashcardRouter = require("./routes/ActivityRoutes/flashcardRoutes");
const themesRouter = require("./routes/ItemRoutes/themeRoutes");
const profilePsRouter = require("./routes/ItemRoutes/profilePictureRoutes");
const bannersRouter = require("./routes/ItemRoutes/bannerRoutes");
const ratingRouter = require("./routes/ActivityRoutes/ratingRoutes");

const cors = require("cors");
const { levelUp } = require("./LevelSystem/Level");

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
app.use("/admin", adminRouter);
app.use("/assignments", assignmentsRouter);
app.use("/classes", classesRouter);
app.use("/module", moduleRouter);
app.use("/quiz", quizRouter);
app.use("/decks", flashcardRouter);
app.use("/profilePicture", profilePsRouter);
app.use("/theme", themesRouter);
app.use("/banner", bannersRouter);
app.use("/rating", ratingRouter);

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`API started on port: ${port}`);
});

app.get("/", async (req, res) => {
  res.json({ status: "Ready" });
});

// console.log(levelUp(1, 100071, 0));
