const express = require("express");

const router = express.Router();

const mainController = require("../controllers").mainController;
router.post("/", mainController.getAll);
router.post("/fetch", mainController.getbyID);
router.post("/fetchbymonth", mainController.getByMonth);
router.post("/clockin", mainController.insertClockIn);
router.patch("/", mainController.insertClockOut);
module.exports = router;
