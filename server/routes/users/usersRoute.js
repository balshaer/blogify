const {
  getAllUsers,
  getUsersCount,
  getUserProfile,
  editUserProfile,
  uploadProfilePhoto,
  deleteUserProfile,
} = require("../../controllers/users/usersController");
const photoUpload = require("../../middlewares/uploadProfilePhoto");
const validateObjectId = require("../../middlewares/validateObjectId");
const {
  verifyTokenAndAdmin,
  verifyTokenAndEditUser,
  verifyToken,
  verifyTokenAndAuth,
} = require("../../middlewares/verifyToken");

const router = require("express").Router();

//Routes
router.get("/", verifyTokenAndAdmin, getAllUsers);
router.get("/count", verifyTokenAndAdmin, getUsersCount);
router.get("/:id", validateObjectId, verifyToken, getUserProfile);
router.put("/:id", validateObjectId, verifyTokenAndEditUser, editUserProfile);
router.post(
  "/profile-photo/",
  verifyToken,
  photoUpload.single("image"),
  uploadProfilePhoto
);
router.delete("/:id", verifyTokenAndAuth, deleteUserProfile);

module.exports = router;
