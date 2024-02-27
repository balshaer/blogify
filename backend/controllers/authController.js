const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const { User, validateRegisterUser, validateLogin } = require("../models/User");

/**----------------------------------------------------------------
 * @desc Register New User
 * @route /api/auth/register
 * @method POST
 * @access public
 * ----------------------------------------------------------------
 */

module.exports.registerController = asyncHandler(async (req, res) => {
  const { error } = validateLogin(req.body);

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

/**----------------------------------------------------------------
 * @desc Login New User
 * @route /api/auth/login
 * @method POST
 * @access public
 * ----------------------------------------------------------------
 */

module.exports.loginController = asyncHandler(async (req, res) => {
  const error = validateLogin(req.body);

  if (error) {
    return res.status(401).json({ message: error.details[0] });
  }

  const isUserExist = User.findOne({ email: req.body.email });

  if (!isUserExist) {
    return res.send
      .status(401)
      .json({ message: "Invalid in email or password" });
  }

  const isPasswordMatch = bcrypt.compare(req.body.password, User.password);

  if (!isPasswordMatch) {
    return res.status(401).json({ message: "Invalid in email or password" });
  }

  const token = User.generateLoginToken();

  res.status(200).json({
    id: User._id,
    isAdmin: User.isAdmin,
    profilePhoto: User.profilePhoto,
    token,
  });
});
