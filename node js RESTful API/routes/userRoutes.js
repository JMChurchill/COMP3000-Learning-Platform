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

router.route("/login").get(async (req, res) => {
  data = {
    email: req.body.email,
    password: req.body.password,
  };
  const query = "SELECT * FROM users WHERE email = ?";
  pool.query(query, [req.body.email], async (error, results) => {
    if (!results[0]) {
      res.status(404).json({ status: "Email not found" });
    } else {
      try {
        if (await bcrypt.compare(req.body.password, results[0].Password)) {
          const token = await JWT.sign({ data }, process.env.SECURE_KEY, {
            expiresIn: 3600,
          });
          res.status(200).json({
            message: "Successfull login",
            data: results[0],
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
  .route("/:id")
  .get(async (req, res) => {
    const query = "SELECT * FROM users WHERE id = ?";
    pool.query(query, [req.params.id], (error, results) => {
      if (!results[0]) {
        res.status(404).json({ status: "Not found!" });
      } else {
        res.status(200).json(results[0]);
      }
    });
  })
  .put(async (req, res) => {
    const data = {
      email: req.body.email,
      name: req.body.name,
      password: req.body.password,
    };
    const query = `UPDATE users SET Email = '${data.email}', Name = '${data.email}',Password = '${data.password}' WHERE id = ${req.params.id}`;
    pool.query(query, (error) => {
      if (error) {
        res.status(400).json({ status: "failure", reason: error.code });
      } else {
        res.status(200).json({ status: "success", data: data });
      }
    });
  })
  .delete(async (req, res) => {
    const query = "DELETE FROM users WHERE id = ?";
    pool.query(query, [req.params.id], (error) => {
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

router.get("/", async (req, res) => {
  const query = "SELECT * FROM users";
  pool.query(query, (error, results) => {
    if (results === null) {
      res.status(204).json({ status: "Not found" });
    } else {
      res.status(200).json(results);
    }
  });
});

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
        name: req.body.name,
        password: hashedPassword,
      };
      email = data.email;
      const token = await JWT.sign(
        { email, hashedPassword },
        process.env.SECURE_KEY,
        {
          expiresIn: 3600,
        }
      );
      const query = "INSERT INTO users (Email,Name,Password) VALUES(?,?,?)";
      pool.query(query, Object.values(data), (error) => {
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

// router.route("/login").get(async (req, res) => {
//   data = {
//     email: req.body.email,
//     password: req.body.password,
//   };
//   const query = "SELECT * FROM users WHERE email = ?";
//   console.log(data);
//   pool.query(query, [req.body.email], async (error, results) => {
//     if (!results[0]) {
//       console.log(req.body.email);
//       res.status(404).json({ status: "Email not found" });
//     } else {
//       // console.log(results[0].Password);
//       try {
//         if (await bcrypt.compare(req.body.password, results[0].Password)) {
//           res
//             .status(200)
//             .json({ message: "Successfull login", data: results[0] });
//         } else {
//           res.status(404).json({ status: "Password not matching" });
//         }
//       } catch {
//         res.status(404).json({ status: "error occured" });
//       }
//     }
//   });
// });

// router.post(createNewUser);

module.exports = router;
