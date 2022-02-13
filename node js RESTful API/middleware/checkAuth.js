if (process.env.NODE_ENV != "production") {
  const dotenv = require("dotenv").config({ path: "./.env" });
}
const JWT = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  // const token = req.header("x-auth-token");
  const token = req.header("autherization");
  // const authHeader = req.header("autherization");
  // const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      errors: [
        {
          message: "No Token",
        },
      ],
    });
  }

  try {
    let user = await JWT.verify(token, process.env.SECURE_KEY);
    // console.log(user);
    req.user = user.data;
    // console.log(user);
    // req.password = user.password;
    next();
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
