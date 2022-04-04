if (process.env.NODE_ENV != "production") {
  const dotenv = require("dotenv").config({ path: "./.env" });
}

const express = require("express");
const router = express.Router();
const pool = require("../../config/db");
const bcrypt = require("bcrypt");
const { check, validationResult, oneOf } = require("express-validator");
const JWT = require("jsonwebtoken");
const checkAuth = require("../../middleware/checkAuth");

//create quiz
router
  .route("/create")
  .post(
    [
      check("title", "Invalid title").not().isEmpty(),
      check("questions", "Quiz has no questions").isArray({ min: 1 }),
      oneOf([
        check("selectedModule", "Incorrect module id").isInt(),
        check("selectedModule", "Incorrect module id").isEmpty(),
      ]),
    ],
    checkAuth,
    async (req, res) => {
      try {
        //get these values from check auth (JWT)
        const email = req.user.email;
        const password = req.user.password;

        let quizID;
        let opID;
        //validate inputs
        const errs = validationResult(req);
        if (!errs.isEmpty()) {
          console.log(errs);
          return res.status(400).json({
            errors: errs.array(),
          });
        }
        const data = {
          title: req.body.title,
          questions: req.body.questions,
          moduleID: req.body.selectedModule,
        };
        // console.log(data.title);
        // console.log(data);
        // console.log(data.questions[0].options);

        const query = `CALL quiz_create ("${data.title}",${data.moduleID}, "${email}", "${password}")`;
        pool.query(query, (error, results) => {
          if (error) {
            return res
              .status(400)
              .json({ status: "failure", reason: error.code });
          } else {
            // get the quiz just inserted id
            quizID = results[0][0]["LAST_INSERT_ID()"];
            console.log(quizID);

            // insert questions
            data.questions.map((question) => {
              const query = `CALL quiz_add_question (${quizID},"${question.name}","${question.details}", ${question.correct})`;
              console.log("the query: ", query);

              pool.query(query, (error, results) => {
                if (error) {
                  return res
                    .status(400)
                    .json({ status: "failure", reason: error.code });
                } else {
                  // get the question just inserted id
                  opID = results[0][0]["LAST_INSERT_ID()"];
                  console.log(opID);
                  // insert options
                  question.options.map((option) => {
                    const query = `CALL quiz_add_question_option (${opID},"${option}")`;
                    console.log("the query: ", query);
                    pool.query(query, (error, results) => {
                      if (error) {
                        return res.status(400).json({
                          status: "failure",
                          reason: error.code,
                        });
                      } else {
                      }
                    });
                  });
                }
              });
            });
          }
          return res.status(201).json({
            status: "success",
            quizID,
            // data: results[0],
          });
        });
      } catch (err) {
        return res.status(500).send(err);
      }
    }
  );

// view quiz
router
  .route("/view")
  .get(
    [check("quizID", "Enter a quiz id").not().isEmpty()],
    checkAuth,
    async (req, res) => {
      try {
        let quiz = { quizID: null, quizName: "", questions: [] };

        const errs = validationResult(req);
        if (!errs.isEmpty()) {
          console.log(errs);
          return res.status(400).json({
            errors: errs.array(),
          });
        }
        const quizID = req.query.quizID;
        let query = `CALL quiz_view ("${quizID}")`;

        const [quized] = await pool.query(query).catch((err) => {
          // throw err;
          return res.status(400).json({ status: "failure", reason: err });
        });
        quiz.quizID = quized[0].QuizID;
        quiz.quizName = quized[0].QuizName;

        query = `CALL quiz_question_view (${quizID})`;
        const [questionsed] = await pool.query(query).catch((err) => {
          // throw err;
          return res.status(400).json({ status: "failure", reason: err });
        });
        // console.log(questionsed);
        questionsed.map((quest) => {
          let tempQuestion = {
            id: "",
            name: "",
            details: "",
            correct: "",
            options: [],
          };
          tempQuestion.id = quest.QuestionID;
          tempQuestion.name = quest.Question;
          if (quest.details !== null && quest.details !== undefined)
            tempQuestion.details = quest.details;
          tempQuestion.correct = quest.Answer;

          // console.log(tempQuestion);
          quiz.questions.push(tempQuestion);
        });

        numQuests = quiz.questions.length;
        await quiz.questions.map(async (quest, i) => {
          query = `CALL quiz_question_option_view (${quizID},${quest.id})`;
          const [optionsed] = await pool.query(query).catch((err) => {
            // throw err;
            return res.status(400).json({ status: "failure", reason: err });
          });
          // console.log(optionsed);
          await quiz.questions.forEach((q) => {
            if (q.id === optionsed[0].QuestionID) {
              optionsed.map((op) => {
                q.options.push(op.TheOption);
                // console.log("new ops", q.options);
              });
            }
          });
          // console.log(numQuests);
          // console.log(i);
          if (i === numQuests - 1) {
            // console.log("ops: ", quiz.questions);
            console.log(quiz);
            res.status(201).json(quiz);
          }
        });
      } catch (err) {
        return res.status(500).send(err);
      }
    }
  );

// delete quiz
router
  .route("/delete")
  .delete(
    [check("quizID", "Enter a quiz id").not().isEmpty()],
    checkAuth,
    async (req, res) => {
      try {
        const errs = validationResult(req);
        if (!errs.isEmpty()) {
          console.log(errs);
          return res.status(400).json({
            errors: errs.array(),
          });
        }
        //get these values from check auth (JWT)
        const email = req.user.email;
        const password = req.user.password;
        // const data = {
        //   quizID: req.body.quizID
        // };
        const query = `CALL quiz_delete(${req.body.quizID},"${email}","${password}")`;
        console.log(query);
        await pool.query(query).catch((err) => {
          // throw err;
          return res.status(400).json({ status: "failure", reason: err });
        });
        return res.status(200).json({ status: "success" });
      } catch (err) {
        return res.status(500).send(err);
      }
    }
  );

// check answers
router
  .route("/checkAnswers")
  .post(
    [
      check("quizID", "Invalid quizID").not().isEmpty(),
      check("answers", "No answers").isArray({ min: 1 }),
    ],
    checkAuth,
    async (req, res) => {
      try {
        const errs = validationResult(req);
        if (!errs.isEmpty()) {
          console.log(errs);
          return res.status(400).json({
            errors: errs.array(),
          });
        }
        //get these values from check auth (JWT)
        const email = req.user.email;
        const password = req.user.password;

        const data = {
          quizID: req.body.quizID,
          ans: req.body.answers,
        };
        const query1 = `SELECT * FROM QuizClassAssignments WHERE QuizID = ${data.quizID}`;
        const [quiz] = await pool.query(query1).catch((err) => {
          // throw err;
          return res.status(400).json({ status: "failure", reason: err });
        });
        const query = `CALL quiz_answers_by_id(${data.quizID})`;
        const [correctAnswers] = await pool.query(query).catch((err) => {
          // throw err;
          return res.status(400).json({ status: "failure", reason: err });
        });
        const wrongAnswers = [];
        //check answers
        //check if same length
        if (data.ans.length === correctAnswers.length) {
          //loop through correct and check against answers
          correctAnswers.map((corAns) => {
            data.ans.map((answer, i) => {
              if (answer.questionID === corAns.QuestionID) {
                if (answer.ans != corAns.Answer) {
                  wrongAnswers.push(answer.questionID);
                }
              }
            });
          });
        }
        const xp =
          quiz.Xp *
          (correctAnswers.length - wrongAnswers.length / correctAnswers.length);
        console.log(password);
        const coins =
          quiz.Coins *
          (correctAnswers.length - wrongAnswers.length / correctAnswers.length);
        console.log(coins);

        const query3 = `CALL quiz_submission_add(${data.quizID},${
          correctAnswers.length - wrongAnswers.length
        },${xp},${coins},"${email}","${password}")`;
        console.log(query3);
        await pool.query(query3).catch((err) => {
          // throw err;
          return res.status(400).json({ status: "failure", reason: err });
        });
        return res.status(200).json({
          status: "success",
          correctAnswers,
          wrongAnswers,
          xp,
          coins,
        });
      } catch (err) {
        return res.status(500).send(err);
      }
    }
  );

// get all quizzes
router.route("/all").get(checkAuth, async (req, res) => {
  try {
    //get these values from check auth (JWT)
    const email = req.user.email;
    const password = req.user.password;
    const query = `CALL quiz_all_by_teacher ("${email}", "${password}")`;
    console.log(query);
    const [quizzes] = await pool.query(query).catch((err) => {
      // throw err;
      return res.status(400).json({ status: "failure", reason: err });
    });
    return res.status(200).json({
      status: "success",
      quizzes,
    });
  } catch (err) {}
});

// get all quizzes by class
router
  .route("/all/class")
  .get(
    [check("classID", "Invalid class ID").not().isEmpty()],
    checkAuth,
    async (req, res) => {
      try {
        //get these values from check auth (JWT)
        const email = req.user.email;
        const password = req.user.password;
        const classID = req.query.classID;
        const query = `CALL quiz_all_by_teacher_classID (${classID},"${email}", "${password}")`;
        console.log(query);
        const [quizzes] = await pool.query(query).catch((err) => {
          // throw err;
          return res.status(400).json({ status: "failure", reason: err });
        });
        return res.status(200).json({
          status: "success",
          quizzes,
        });
      } catch (err) {}
    }
  );

module.exports = router;