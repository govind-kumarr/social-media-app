const express = require("express");
const { connection } = require("./config/db");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const { UserRegisterModel } = require("./models/registerModel");
const { UserRoutes } = require("./routes/user.route");
const { homeRoute } = require("./controllers/home");
const { registerUser, loginUser } = require("./controllers/userMethods");
require("dotenv").config();

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);

app.get("/", homeRoute);

app.post("/register", registerUser);

app.post("/login", loginUser);

const authentication = (req, res, next) => {
  if (!req.headers.token) {
    return res.send({ response: "user not logged in" });
  }
  const user_token = req.headers.token;
  jwt.verify(user_token, process.env.secret, function (err, decoded) {
    if (err) {
      console.log(err);
    }
    next();
  });
};

app.use(authentication);

app.use("/posts", UserRoutes);

app.listen(3500, async () => {
  try {
    await connection;
    console.log("Sending Connection Request");
  } catch (err) {
    console.log("Connection Request Failed");
  }
  console.log("app is running");
});
