const express = require("express");
const router = express.Router();

const userRoutes = require("../routes/user.routes");

// aggregate all routes of this module
router.use(userRoutes);

module.exports = router;
