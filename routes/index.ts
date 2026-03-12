const express = require("express");
const router = express.Router();
const auth = require("./auth");
const projects = require("./projects")
const bug = require('./bug')

router.use("/api", auth);
router.use("/api", projects);
router.use("/api", bug);

module.exports = router;
