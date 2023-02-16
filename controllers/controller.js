const HttpError = require("../models/http-error");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/users");

const login = async (req, res, next) => {
  const { email, password } = req.body;
  const existingUser = await User.findOne({ email });
  if (!existingUser) {
    return next(new HttpError("User not exits", 404));
  }
  let passwordCheck = false;
  passwordCheck = await bcrypt.compare(password, existingUser.password);
  if (!passwordCheck) {
    return next(new HttpError("Password not match", 404));
  }
  let token = jwt.sign(
    { email: existingUser.email, password: existingUser.password },
    "your secret key",
    { expiresIn: "1h" }
  );
  res.json({
    message: "Your are logged in ",
    token: token,
    id: existingUser.id,
  });
};

const signin = async (req, res, next) => {
  const { name, email, password } = req.body;

  let existingUser;
  existingUser = await User.findOne({ email });
  if (existingUser) {
    return next(new HttpError("User already exits", 404));
  }
  if (password.length < 6) {
    return next(new HttpError("password length should be greater than 6", 404));
  }
  let hashedPassword = await bcrypt.hash(password, 12);
  const createUser = new User({
    name,
    email,
    password: hashedPassword,
  });
  const result = await createUser.save();
  res.json({ message: "registered  successfully", id: result.id });
};
exports.login = login;
exports.signin = signin;
