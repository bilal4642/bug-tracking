const express = require("express");
const router = express.Router();
const auth = require("./auth");
const projects = require("./projects")
const bug = require('./bug')
const role = require('./role')
const projectUser = require('./projectUser');


router.use("/api", auth);
router.use("/api", projects);
router.use("/api", bug);
router.use("/api", role)
router.use("/api", projectUser)

module.exports = router;
