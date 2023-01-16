const { UserRegisterModel } = require("../models/registerModel");

exports.registerUser = async (req, res) => {
  const { name, email, gender, password } = req.body;
  try {
    const new_user = new UserRegisterModel({
      name,
      email,
      gender,
      password,
    });
    await new_user.save();
    return res.send("Sent Data to Register New User");
  } catch (error) {
    res.send("Error Occured While Registering User");
  }
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await UserRegisterModel.findOne({ email, password });
  if (!user) {
    return res.send({ responce: -1 });
  }
  try {
    const token = await jwt.sign({ email }, process.env.secret);
    return res.send({
      response: "Succesfully",
      token: token,
      userid: user._id,
    });
  } catch (error) {
    console.log(error);
    return res.send({ response: -1 });
  }
};
