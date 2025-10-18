const express = require("express");
const {
  getUsers,
  getUserId,
  getCurrentUser,
  updateProfile,
  updateAvatar,
} = require("../controllers/users.js");

const {
  validateUserUpdate,
  validateAvatarUpdate,
  validateUserId,
} = require("../middlewares/validation.js");

const router = express.Router();

router.get("/", getUsers);

router.get("/:Id", validateUserId, getUserId);

router.get("/me", getCurrentUser);

router.patch("/me", validateUserUpdate, updateProfile);

router.patch("/me/avatar", validateAvatarUpdate, updateAvatar);

module.exports = router;
