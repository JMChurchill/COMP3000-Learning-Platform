if (process.env.NODE_ENV != "production") {
  const dotenv = require("dotenv").config({ path: "./.env" });
}
const JWT = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  const token = req.header("x-auth-token");

  if (!token) {
    return res.status(400).json({
      errors: [
        {
          message: "No Token",
        },
      ],
    });
  }

  try {
    let user = await JWT.verify(token, process.env.SECURE_KEY);
    req.email = user.email;
    req.password = user.password;
  } catch (error) {
    return res.status(400).json({
      errors: [
        {
          message: "Invalid Token",
        },
      ],
    });
  }
};
