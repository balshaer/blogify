const {
  getAllUsers,
  getUsersCount,
  getUserProfile,
  editUserProfile,
} = require("../../controllers/users/usersController");
const validateObjectId = require("../../middlewares/validateObjectId");
const {
  verifyTokenAndAdmin,
  verifyTokenAndEditUser,
} = require("../../middlewares/verifyToken");

const router = require("express").Router();

router.get("/", verifyTokenAndAdmin, getAllUsers);
router.get("/count", verifyTokenAndAdmin, getUsersCount);
router.get("/:id", validateObjectId, getUserProfile);
router.put("/:id", validateObjectId, verifyTokenAndEditUser, editUserProfile);

module.exports = router;
