var express = require("express");
var router = express.Router();
const checkAuth = require("../middleware/check-auth");
const UserController = require('../controllers/user');

// Create User Signup page * no login required
router.post("/signup", UserController.user_signup);

// Login User * no login requires
router.post("/login", UserController.user_login);

// Delete User * login required
router.delete("/:userId",checkAuth, UserController.delete_user);

module.exports = router;
