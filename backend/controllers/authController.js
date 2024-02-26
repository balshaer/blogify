const mongoose = require("mongoose");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const { User, validateRegisterUser } = require("../models/User");

/**----------------------------------------------------------------
 * @desc Register New User
 * @router /api/auth/register
 * @method POST
 * @access public
 * ----------------------------------------------------------------
 */

//Register Controller

const registerController = asyncHandler(async (req, res) => {
  const { error } = validateRegisterUser(req.body);

  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  let user = await User.findOne({ email: req.body.email });

  if (user) {
    return res.status(400).json({ message: "user is already registered" });
  }

  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(req.body.password, salt);

  user = new User({
    username: req.body.username,
    email: req.body.email,
    password: hashPassword,
  });

  await user.save();

  res
    .status(201)
    .json({ message: "Your Registration is successfully please log in" });
});

module.exports = registerController;
