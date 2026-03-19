const express = require('express');
const router = express.Router();
const {Authentication} = require("../middleware")
const ProjectController = require("../app/projects/ProjectController");

router.get("/project-user", Authentication.authenticate, ProjectController.getProjectUser );



module.exports = router;