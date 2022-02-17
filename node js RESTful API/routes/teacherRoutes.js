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
  const query = "SELECT * FROM teachers WHERE email = ?";
  pool.query(query, [req.body.email], async (error, results) => {
    if (!results[0]) {
      res.status(401).json({ status: "Email not found" });
    } else {
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
          res.status(401).json({ status: "Password not matching" });
        }
      } catch {
        res.status(404).json({ status: "error occured" });
      }
    }
  });
});

router
  .route("/update")
  .put(
    [
      check("email", "Invalid email").isEmail(),
      check("password", "Password < 6").isLength({ min: 6 }),
      check("firstname", "First name is required").not().isEmpty(),
      check("lastname", "Last name is required").not().isEmpty(),
      check("phonenumber", "Phone number is required").not().isEmpty(),
    ],
    checkAuth,
    async (req, res) => {
      //get these values from check auth (JWT)
      const oEmail = req.user.email;
      const oPassword = req.user.password;
      // new values
      const data = {
        email: req.body.email,
        fName: req.body.firstname,
        lName: req.body.lastname,
        phonenumber: req.body.phonenumber,
        // password: req.body.password,
      };
      // const query = `UPDATE teachers SET Email = '${data.email}', Name = '${data.email}',Password = '${data.password}' WHERE id = ${req.params.id}`;
      const query = `CALL update_teacher ( "${oEmail}", "${oPassword}", "${data.fName}", "${data.lName}", "${data.email}","${data.phonenumber}")`;
      console.log(query);
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
    const email = req.user.email;
    const password = req.user.password;
    // const query = "DELETE FROM teachers WHERE id = ?";
    const query = `CALL delete_teacher ( "${email}", "${password}")`;
    pool.query(query, (error) => {
      if (error) {
        res.status(400).json({ status: "failure", reason: error.code });
      } else {
        res.status(200).json({
          status: "success",
          message: `deleted user: ${req.params.id}`,
        });
      }
    });
  });

//get all teachers - for testing
router.get("/", async (req, res) => {
  const query = "SELECT * FROM teachers";
  pool.query(query, (error, results) => {
    if (results === null) {
      res.status(204).json({ status: "Not found" });
    } else {
      res.status(200).json(results);
    }
  });
});

//create teacher
router
  .route("/create")
  .post(
    [
      check("email", "Invalid email").isEmail(),
      check("password", "Password < 6").isLength({ min: 6 }),
      check("firstname", "First name is required").not().isEmpty(),
      check("lastname", "Last name is required").not().isEmpty(),
      check("phonenumber", "Phone number is required").not().isEmpty(),
    ],
    async (req, res) => {
      try {
        //validate inputs
        const errs = validationResult(req);
        if (!errs.isEmpty()) {
          console.log(errs);
          return res.status(400).json({
            errors: errs.array(),
          });
        }
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const data = {
          email: req.body.email,
          firstName: req.body.firstname,
          lastName: req.body.lastname,
          password: hashedPassword,
          phoneNumber: req.body.phonenumber,
        };
        console.log(data);
        email = data.email;
        const token = await JWT.sign(
          //TODO: Stop generating token its unused
          { email, hashedPassword },
          process.env.SECURE_KEY,
          {
            expiresIn: parseInt(process.env.EXPIRES_IN),
          }
        );
        // const query =
        //   "INSERT INTO teachers (Email, FirstName, LastName, Password, PhoneNumber) VALUES(?,?,?,?,?)";
        const query = `CALL create_teacher ("${data.firstName}", "${data.lastName}", "${data.email}", "${data.password}","${data.phoneNumber}")`;
        pool.query(query, (error) => {
          if (error) {
            return res
              .status(400)
              .json({ status: "failure", reason: error.code });
          } else {
            return res.status(201).json({ status: "success" });
            // .json({ status: "success", data: data, token: token });
          }
        });
      } catch (err) {
        return res.status(500).send(err);
      }
    }
  );

//create class
router.route("/classes").post(checkAuth, async (req, res) => {
  //get these values from check auth (JWT)
  const email = req.user.email;
  const password = req.user.password;
  console.log(req.user);
  console.log(email);
  try {
    const data = {
      name: req.body.name,
      yGroup: req.body.year,
    };
    console.log(data);
    const query = `CALL create_class ("${data.name}", ${data.yGroup}, "${email}", "${password}")`;
    console.log(query);
    pool.query(query, (error, results) => {
      if (error) {
        return res.status(400).json({ status: "failure", reason: error.code });
      } else {
        return res.status(201).json({
          status: "success",
          data: data,
          message: "created class",
        });
      }
    });
  } catch (err) {
    return res.status(500).send(err);
  }
});

// assign student to class
router.route("/classes/assign").post(checkAuth, async (req, res) => {
  //get these values from check auth (JWT)
  const email = req.user.email;
  const password = req.user.password;
  console.log(req.user);
  console.log(email);
  try {
    const data = {
      classID: req.body.classID,
      studentID: req.body.studentID,
    };
    console.log(data);
    const query = `CALL add_student_to_class (${data.classID}, ${data.studentID}, "${email}", "${password}")`;
    console.log(query);
    pool.query(query, (error, results) => {
      if (error) {
        return res.status(400).json({ status: "failure", reason: error.code });
      } else {
        return res.status(201).json({
          status: "success",
          data: data,
          message: "student added to class",
        });
      }
    });
  } catch (err) {
    return res.status(500).send(err);
  }
});

module.exports = router;