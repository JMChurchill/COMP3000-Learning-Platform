if (process.env.NODE_ENV != "production") {
  const dotenv = require("dotenv").config({ path: "./.env" });
}

const express = require("express");
const router = express.Router();
const pool = require("../config/db");
const bcrypt = require("bcrypt");
const { check, validationResult } = require("express-validator");
const JWT = require("jsonwebtoken");
const checkAuth = require("../middleware/checkAuth");

router.route("/login").post(async (req, res) => {
  data = {
    email: req.body.email,
    password: req.body.password,
  };
  const query = `SELECT * FROM students WHERE email = "${data.email}"`;
  pool.query(query, async (error, results) => {
    console.log(query);
    if (error) {
      return res.status(500).json({ status: "failure", reason: error.code });
    }
    if (!results[0]) {
      res.status(401).json({ status: "Email or Password incorrect" });
    } else {
      try {
        if (await bcrypt.compare(req.body.password, results[0].Password)) {
          data.password = results[0].Password;
          const token = await JWT.sign({ data }, process.env.SECURE_KEY, {
            expiresIn: parseInt(process.env.EXPIRES_IN),
          });
          res.status(200).json({
            message: "Successfull login",
            token: token,
          });
        } else {
          res.status(401).json({ status: "Email or Password incorrect" });
        }
      } catch {
        res.status(404).json({ status: "error occured" });
      }
    }
  });
});

//update student , delete student
router
  .route("/")
  .put(
    checkAuth,
    [
      check("email", "Invalid email").isEmail(),
      // check("password", "Password < 6").isLength({ min: 6 }),
      check("firstname", "First name is required").not().isEmpty(),
      check("lastname", "Last name is required").not().isEmpty(),
    ],
    async (req, res) => {
      const errs = validationResult(req);
      if (!errs.isEmpty()) {
        return res.status(400).json({
          errors: errs.array(),
        });
      }
      //get these values from check auth (JWT)
      const oEmail = req.user.email;
      const oPassword = req.user.password;
      // new values
      const data = {
        email: req.body.email,
        fName: req.body.firstname,
        lName: req.body.lastname,
      };
      const query = `CALL update_student ( "${oEmail}", "${oPassword}", "${data.fName}", "${data.lName}", "${data.email}")`;
      pool.query(query, (error) => {
        if (error) {
          res.status(400).json({ status: "failure", reason: error.code });
        } else {
          res.status(200).json({ status: "success", data: data });
        }
      });
    }
  )
  .delete(checkAuth, async (req, res) => {
    //get these values from check auth (JWT)
    const oEmail = req.user.email;
    const oPassword = req.user.password;
    const query = `CALL delete_student ( "${oEmail}", "${oPassword}")`;
    pool.query(query, (error) => {
      if (error) {
        res.status(400).json({ status: "failure", reason: error.code });
      } else {
        res.status(200).json({
          status: "success",
          message: `deleted user: ${oEmail}`,
        });
      }
    });
  });

//create student
router
  .route("/create")
  .post(
    [
      check("email", "Invalid email").isEmail(),
      check("password", "Password < 6").isLength({ min: 6 }),
      check("firstname", "First name is required").not().isEmpty(),
      check("lastname", "Last name is required").not().isEmpty(),
    ],
    async (req, res) => {
      try {
        //validate inputs
        const errs = validationResult(req);
        if (!errs.isEmpty()) {
          return res.status(400).json({
            errors: errs.array(),
          });
        }
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const data = {
          email: req.body.email,
          fName: req.body.firstname,
          lName: req.body.lastname,
          password: hashedPassword,
        };
        email = data.email;
        const query = `CALL create_student ("${data.fName}", "${data.lName}", "${data.email}", "${data.password}")`;
        pool.query(query, (error) => {
          if (error) {
            return res
              .status(400)
              .json({ status: "failure", reason: error.code });
          } else {
            return res.status(201).json({ status: "success" });
          }
        });
      } catch (err) {
        return res.status(500).send(err);
      }
    }
  );

//get students by class
router
  .route("/class")
  .post(
    [check("classID", "ClassID is required").not().isEmpty()],
    checkAuth,
    async (req, res) => {
      const errs = validationResult(req);
      if (!errs.isEmpty()) {
        return res.status(400).json({
          errors: errs.array(),
        });
      }

      const email = req.user.email;
      const password = req.user.password;
      const data = {
        classID: req.body.classID,
      };
      const query = `CALL get_students_by_class (${data.classID}, "${email}", "${password}")`;
      pool.query(query, (error, results) => {
        if (results === null) {
          res.status(204).json({ status: "Not found" });
        } else {
          res.status(200).json({ status: "success", data: results[0] });
        }
      });
    }
  );

//get students details
router.route("/details").get(checkAuth, async (req, res) => {
  const email = req.user.email;
  const password = req.user.password;

  const query = `CALL get_student_details ("${email}", "${password}")`;
  pool.query(query, (error, results) => {
    if (results === null) {
      res.status(204).json({ status: "Not found" });
    } else {
      res.status(200).json({ status: "success", data: results[0] });
    }
  });
});

// //get student xp
// router.route("/details/xp").get(checkAuth, async (req, res) => {
//   const email = req.user.email;
//   const password = req.user.password;

//   const query = `CALL get_students_xp ("${email}", "${password}")`;
//   pool.query(query, (error, results) => {
//     if (results === null) {
//       res.status(204).json({ status: "Not found" });
//     } else {
//       res.status(200).json({ status: "success", data: results[0] });
//     }
//   });
// });

// //get student coins
// router.route("/details/coins").get(checkAuth, async (req, res) => {
//   const email = req.user.email;
//   const password = req.user.password;

//   const query = `CALL get_students_coins ("${email}", "${password}")`;
//   pool.query(query, (error, results) => {
//     if (results === null) {
//       res.status(204).json({ status: "Not found" });
//     } else {
//       res.status(200).json({ status: "success", data: results[0] });
//     }
//   });
// });

module.exports = router;
