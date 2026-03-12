const express = require("express");
const AuthController = require("../app/auth/AuthController");
const {Authentication} = require('../middleware')
const router = express.Router();

router.post("/sign-up", AuthController.signup);

router.post("/login", AuthController.login);

// router.post("/refresh-token", Authentication.authenticate )

module.exports = router;
