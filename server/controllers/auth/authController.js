const asyncHandler = require("express-async-handler");
const {
  User,
  validateRegisterUser,
  validateLoginUser,
} = require("../../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

/**
 * -------------------------------------------------
 *@desc   : register a new user
 *@router : /api/auth/register
 *@method : POST
 *@access : public
 *-------------------------------------------------
 **/

const registerController = asyncHandler(async (req, res) => {
  let user = await User.findOne({ email: req.body.email });
  const { error } = validateRegisterUser(req.body);
  const username = await User.findOne({ username: req.body.username });

  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  if (user) {
    return res.status(400).json({ message: "this user is already registered" });
  }

  if (username) {
    return res
      .status(400)
      .json({ message: "this username is already been taken" });
  }

  const salt = await bcrypt.genSalt(10);
  const hashThePassword = await bcrypt.hash(req.body.password, salt);

  //@TODO : Check if the account is verified

  user = new User({
    fullName: req.body.fullName,
    username: req.body.username,
    email: req.body.email,
    password: hashThePassword,
    bio: req.body.bio,
  });

  const saveUser = await user.save();

  const { password, ...other } = saveUser._doc;

  const token = jwt.sign(
    { id: req.body._id, isAdmin: req.body.isAdmin },
    process.env.SECRET_KEY,
    { expiresIn: "360d" }
  );

  res.status(201).json({ ...other, token });
});

/**
 * -------------------------------------------------
 *@desc   : login user
 *@router : /api/auth/login
 *@method : POST
 *@access : public
 *-------------------------------------------------
 **/

const loginController = asyncHandler(async (req, res) => {
  const user = await User.findOne({ email: req.body.email });

  const { error } = validateLoginUser(req.body);

  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  if (!user) {
    return res.status(404).json({ message: "invaild email or password" });
  }

  const isPasswordMatch = await bcrypt.compare(
    req.body.password,
    user.password
  );

  if (!isPasswordMatch) {
    return res.status(400).json({ message: "invaild email or password" });
  }

  //@TODO : Check if the account is verified

  const token = jwt.sign(
    { id: user._id, isAdmin: user.isAdmin },
    process.env.SECRET_KEY
  );

  res.status(201).json({ token });
});

module.exports = { registerController, loginController };
