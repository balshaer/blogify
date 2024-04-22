const asyncHandler = require("express-async-handler");
const { User, validateRegisterUser } = require("../../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

/**
 *@desc   : register a new user
 *@router : /api/auth/register
 *@method : POST
 *@access : public
 **/

const registerController = asyncHandler(async (req, res) => {
  let user = await User.findOne({ email: req.body.email });
  const { error } = validateRegisterUser(req.body);

  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  if (user) {
    return res.status(400).json({ message: "this user is already registered" });
  }

  const salt = await bcrypt.genSalt(10);
  const hashThePassword = await bcrypt.hash(req.body.password, salt);

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

module.exports = { registerController };
