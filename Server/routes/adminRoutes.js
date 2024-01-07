const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");

router.post("/signup", adminController.signup);

router.post("/login", adminController.login);

router.post("/logout", adminController.logout);

module.exports = router;