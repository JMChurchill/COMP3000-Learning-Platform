const express = require("express");
const router = express.Router();
const pool = require("../config/db");
const bcrypt = require("bcrypt");
const { check, validationResult } = require("express-validator");
const JWT = require("jsonwebtoken");
const checkAuth = require("../middleware/checkAuth");

// quiz object
// [
//   {
//     id: 0,
//     name: "1+1",
//     details: "asdas",
//     correct: 0,
//     options: ["2", "3", "4"],
//   },
//   {
//     id: 1,
//     name: "3+2",
//     details: "add",
//     correct: 0,
//     options: ["3", "5", "4"],
//   },
// ];

//create quiz
router
  .route("/quiz/create")
  .post(
    [
      check("title", "Invalid email").not().isEmpty(),
      check("questions", "Quiz has no questions").isArray({ min: 1 }),
    ],
    checkAuth,
    async (req, res) => {
      try {
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
        };
        // console.log(data.title);
        // console.log(data);
        // console.log(data.questions[0].options);

        const query = `CALL quiz_create ("${data.title}")`;
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
  .route("/quiz/view")
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

router
  .route("/quiz/checkAnswers")
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
        const data = {
          quizID: req.body.quizID,
          ans: req.body.answers,
        };
        const query = `CALL quiz_answers_by_id(${data.quizID})`;
        console.log(query);
        const [correctAnswers] = await pool.query(query).catch((err) => {
          // throw err;
          return res.status(400).json({ status: "failure", reason: err });
        });
        let isCorrect = true;
        const wrongAnswers = [];
        //check answers
        //check if same length
        if (data.ans.length === correctAnswers.length) {
          //loop through correct and check against answers
          correctAnswers.map((corAns) => {
            data.ans.map((answer, i) => {
              if (answer.questionID === corAns.QuestionID) {
                if (answer.ans != corAns.Answer) {
                  isCorrect = false;
                  wrongAnswers.push(answer.questionID);
                }
              }
            });
          });
        } else {
          isCorrect = false;
        }
        return res
          .status(200)
          .json({ status: "success", correctAnswers, isCorrect, wrongAnswers });
      } catch (err) {
        return res.status(500).send(err);
      }
    }
  );
module.exports = router;
