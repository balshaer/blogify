const asyncHandler = require("express-async-handler");
const { User } = require("../../models/User");

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

module.exports = { getAllUsers };
