if (process.env.NODE_ENV != "production") {
  const dotenv = require("dotenv").config({ path: "./.env" });
}

const express = require("express");
const router = express.Router();
const pool = require("../../config/db");
const bcrypt = require("bcrypt");
const { check, validationResult } = require("express-validator");
const JWT = require("jsonwebtoken");
const checkAuth = require("../../middleware/checkAuth");

// get all themes
router.route("/").get(checkAuth, async (req, res) => {
  try {
    const email = req.user.email;
    const password = req.user.password;

    const errs = validationResult(req);
    if (!errs.isEmpty()) {
      console.log(errs);
      return res.status(400).json({
        errors: errs.array(),
      });
    }

    const query = `CALL ProfilePic_get_all ("${email}", "${password}")`;

    const [themes] = await pool.query(query).catch((err) => {
      // throw err;
      return res.status(400).json({ status: "failure", reason: err });
    });
    // console.log(results);
    return res.status(200).json({
      status: "success",
      data: themes,
    });
  } catch (err) {
    return res.status(500).send(err);
  }
});

// get all purchased profile pics
router.route("/purchased").get(checkAuth, async (req, res) => {
  try {
    const email = req.user.email;
    const password = req.user.password;

    const errs = validationResult(req);
    if (!errs.isEmpty()) {
      console.log(errs);
      return res.status(400).json({
        errors: errs.array(),
      });
    }

    const query = `CALL ProfilePic_purchased ("${email}", "${password}")`;

    const [themes] = await pool.query(query).catch((err) => {
      // throw err;
      return res.status(400).json({ status: "failure", reason: err });
    });
    // console.log(results);
    return res.status(200).json({
      status: "success",
      data: themes,
    });
  } catch (err) {
    return res.status(500).send(err);
  }
});

// purchase a theme
router
  .route("/purchased")
  .post(
    [
      check("ProfilePictureID", "A ProfilePictureID is required")
        .not()
        .isEmpty(),
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
        const email = req.user.email;
        const password = req.user.password;
        const data = {
          profilePictureID: req.body.ProfilePictureID,
        };

        const query = `CALL ProfilePic_purchased_add (${data.profilePictureID},"${email}", "${password}")`;
        // console.log(query);
        const results = await pool.query(query).catch((err) => {
          // throw err;
          return res.status(400).json({ status: "failure", reason: err });
        });
        // console.log("results", results);

        return res.status(200).json({
          status: "success",
          results,
        });
      } catch (err) {
        return res.status(500).send(err);
      }
    }
  );

module.exports = router;
