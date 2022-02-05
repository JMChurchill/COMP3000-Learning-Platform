if (process.env.NODE_ENV != "production") {
  const dotenv = require("dotenv").config({ path: "./.env" });
}

const cookieParser = require("cookie-parser");
const express = require("express");
const userRouter = require("./routes/userRoutes");
const teacherRouter = require("./routes/teacherRoutes");
const assignmentsRouter = require("./routes/assignmentsRoutes");
const leaderboardRouter = require("./routes/leaderboardRoutes");
// const cors = require("cors");

const app = express();

// const corsOptions = {
//   origin: true, //included origin as true
//   credentials: true, //included credentials as true
// };

//middleware
// app.use(cookieParser());
app.use(express.json());
// app.use(cors(corsOptions));

//redirect requests to endpoint starting with /posts to postRoutes.js
app.use("/user", userRouter);
app.use("/teacher", teacherRouter);
app.use("/leaderboard", leaderboardRouter);
app.use("/assignments", assignmentsRouter);

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`API started on port: ${port}`);
});

app.get("/", async (req, res) => {
  res.json({ status: "Ready" });
});
