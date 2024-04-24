const asyncHandler = require("express-async-handler");
const { User, validateEditUser } = require("../../models/User");
const bcrypt = require("bcrypt");

/**
 * -------------------------------------------------
 *@desc   : get users profile
 *@router : /api/users/
 *@method : GET
 *@access : private (only admin)
 *-------------------------------------------------
 **/

const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find();

  res.status(200).json(users);
});

/**
 * -------------------------------------------------
 *@desc   : get users count
 *@router : /api/users/count
 *@method : GET
 *@access : private (only admin)
 *-------------------------------------------------
 **/

const getUsersCount = asyncHandler(async (req, res) => {
  const users = await User.countDocuments();
  res.status(200).json(users);
});

/**
 * -------------------------------------------------
 *@desc   : get user profile
 *@router : /api/users/:id
 *@method : GET
 *@access : public
 *-------------------------------------------------
 **/

const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findOne({ _id: req.params.id }).select("-password");

  if (!user) {
    return res.status(404).json({ message: "user not found" });
  }

  res.status(200).json(user);
});

/**
 * -------------------------------------------------
 *@desc   : edit user profile
 *@router : /api/users/:id
 *@method : PUT
 *@access : private (only himself)
 *-------------------------------------------------
 **/

const editUserProfile = asyncHandler(async (req, res) => {
  const { erorr } = validateEditUser(req.body);

  if (erorr) {
    return res.status(400).json({ message: erorr.details[0].message });
  }

  const salt = await bcrypt.genSalt(10);

  const hash = await bcrypt.hash(req.body.password, salt);

  const user = await User.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        fullName: req.body.fullName,
        password: hash,
        bio: req.body.bio,
      },
    },
    { new: true }
  ).select("-password");

  if (!user) {
    return res.status(404).json({ message: "user not found" });
  }

  const result = await user.save();

  res.status(200).json(result);
});

/**
 * -------------------------------------------------
 *@desc   : upload profile photo
 *@router : /api/users/profile-photo
 *@method : POST
 *@access : private (only himself)
 *-------------------------------------------------
 **/

const uploadProfilePhoto = asyncHandler(async (req, res) => {
  if (!req.file) {
    return res.status(404).json({ message: "no file provided" });
  }

  return res
    .status(200)
    .json({ message: "your profile photo uploaded successfully" });
});

module.exports = {
  getAllUsers,
  getUsersCount,
  getUserProfile,
  editUserProfile,
  uploadProfilePhoto,
};
