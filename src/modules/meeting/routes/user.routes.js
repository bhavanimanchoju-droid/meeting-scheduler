const express = require("express");
const router = express.Router();
const userController = require("../interface/user.controller");

router.post("/users", userController.createUser);
router.get("/users/:id", userController.getUser);

module.exports = router;
