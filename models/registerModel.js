const mongoose = require("mongoose");

const userRegisterSchema = mongoose.Schema(
  {
    name: String,
    email: String,
    gender: String,
    password: String,
  },
  {
    versionKey: false,
  }
);

const UserRegisterModel = mongoose.model("users", userRegisterSchema);

module.exports = {
  UserRegisterModel,
};
