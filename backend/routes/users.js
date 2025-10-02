const express = require("express");
const {
  getUsers,
  getUserId,
  UserCreate,
  updateProfile,
  updateAvatar,
} = require("../controllers/users.js");

const router = express.Router();

router.get("/users", getUsers);

router.get("/:userId", getUserId);

router.post("/", UserCreate);

router.patch("/me", updateProfile);

router.patch("/avatar", updateAvatar);

module.exports = router;
