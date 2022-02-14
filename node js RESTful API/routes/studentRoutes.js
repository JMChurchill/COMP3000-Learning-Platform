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
  console.log("logging in");
  const query = "SELECT * FROM students WHERE email = ?";
  pool.query(query, [req.body.email], async (error, results) => {
    if (!results[0]) {
      res.status(404).json({ status: "Email not found" });
    } else {
      console.log(parseInt(process.env.EXPIRES_IN));
      try {
        if (await bcrypt.compare(req.body.password, results[0].Password)) {
          data.password = results[0].Password;
          const token = await JWT.sign({ data }, process.env.SECURE_KEY, {
            expiresIn: parseInt(process.env.EXPIRES_IN),
          });
          res.status(200).json({
            message: "Successfull login",
            // data: results[0],
            token: token,
          });
        } else {
          // res.cookie("token", { token }, { maxAge: 3000, httpOnly: false });
          res.status(404).json({ status: "Password not matching" });
        }
      } catch {
        res.status(404).json({ status: "error occured" });
      }
    }
  });
});

router
  .route("/")
  .put(checkAuth, async (req, res) => {
    //get these values from check auth (JWT)
    const oEmail = req.user.email;
    const oPassword = req.user.password;
    console.log(oEmail);
    console.log(oPassword);
    // new values
    const data = {
      email: req.body.email,
      fName: req.body.firstname,
      lName: req.body.lastname,
      password: req.body.password,
    };
    const query = `CALL update_student ( "${oEmail}", "${oPassword}", "${data.fName}", "${data.lName}", "${data.email}", "${data.password}")`;
    console.log(query);
    pool.query(query, (error) => {
      if (error) {
        res.status(400).json({ status: "failure", reason: error.code });
      } else {
        res.status(200).json({ status: "success", data: data });
      }
    });
  })
  .delete(checkAuth, async (req, res) => {
    //get these values from check auth (JWT)
    const oEmail = req.user.email;
    const oPassword = req.user.password;
    // const query = "DELETE FROM users WHERE id = ?";
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
router.post(
  "/",
  [
    check("email", "Invalid email").isEmail(),
    check("password", "Password < 6").isLength({ min: 6 }),
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
      const token = await JWT.sign(
        { email, hashedPassword },
        process.env.SECURE_KEY,
        {
          expiresIn: parseInt(process.env.EXPIRES_IN),
        }
      );
      //   const query = "INSERT INTO users (Email,Name,Password) VALUES(?,?,?)";
      const query = `CALL create_student ("${data.fName}", "${data.lName}", "${data.email}", "${data.password}")`;
      pool.query(query, (error) => {
        if (error) {
          return res
            .status(400)
            .json({ status: "failure", reason: error.code });
        } else {
          return res
            .status(201)
            .json({ status: "success", data: data, token: token });
        }
      });
    } catch (err) {
      return res.status(500).send(err);
    }
  }
);

//get students by class
router.route("/class").get(checkAuth, async (req, res) => {
  const email = req.user.email;
  const password = req.user.password;
  const data = {
    classID: req.body.classID,
  };
  // const query = "SELECT * FROM teachers";
  const query = `CALL get_students_by_class (${data.classID}, "${email}", "${password}")`;
  // console.log(query);
  pool.query(query, (error, results) => {
    if (results === null) {
      res.status(204).json({ status: "Not found" });
    } else {
      // console.log(results[0]);
      res.status(200).json(results);
    }
  });
});

// router.post(createNewUser);

module.exports = router;
