const express = require("express");
const router = express.Router();
const loginController = require("../controllers").loginController;

router.post("/", loginController.goLogin);

module.exports = router;
