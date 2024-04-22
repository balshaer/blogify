const { getAllUsers } = require("../../controllers/users/usersController");
const { verifyTokenAndAdmin } = require("../../middlewares/verifyToken");

const router = require("express").Router();

router.get("/", verifyTokenAndAdmin, getAllUsers);

module.exports = router;
