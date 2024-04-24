const {
  getAllUsers,
  getUsersCount,
  getUserProfile,
  editUserProfile,
  uploadProfilePhoto,
} = require("../../controllers/users/usersController");
const photoUpload = require("../../middlewares/uploadProfilePhoto");
const validateObjectId = require("../../middlewares/validateObjectId");
const {
  verifyTokenAndAdmin,
  verifyTokenAndEditUser,
  verifyToken,
} = require("../../middlewares/verifyToken");

const router = require("express").Router();

router.get("/", verifyTokenAndAdmin, getAllUsers);
router.get("/count", verifyTokenAndAdmin, getUsersCount);
router.get("/:id", validateObjectId, verifyToken, getUserProfile);
router.put("/:id", validateObjectId, verifyTokenAndEditUser, editUserProfile);
router.post(
  "/profile-photo",
  verifyToken,
  photoUpload.single("image"),
  uploadProfilePhoto
);

module.exports = router;
