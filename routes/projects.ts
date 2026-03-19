const express = require('express');
const {Authentication} = require("../middleware")
const {Authorization} = require("../middleware")
const router = express.Router();
const ProjectController = require("../app/projects/ProjectController");

router.get("/projects", Authentication.authenticate, ProjectController.getProjects );

router.get("/projects/:id",Authentication.authenticate, ProjectController.getProjectById);

router.post("/projects", Authentication.authenticate ,ProjectController.addProject );

// router.delete("/projects/:id", Authentication.authenticate ,ProjectController.deleteProject);

module.exports = router;