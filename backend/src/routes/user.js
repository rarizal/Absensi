const express = require("express");
const router = express.Router();
const userController = require("../controllers").userController;
router.get("/:id", userController.getById);
router.get("/", userController.getAll);
router.post("/", userController.insertUserV1, userController.getAll);

module.exports = router;
