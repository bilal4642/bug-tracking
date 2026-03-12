const express = require('express');
const {Authentication} = require("../middleware")
const {Authorization} = require('../middleware')
const router = express.Router();
const BugController = require("../app/bug/BugController");
const upload = require("../middleware/upload")

router.get("/bug", (req:any,res:any)=>{
    console.log("hello");
    
    res.send("true")
})

router.get("/projects/:projectId/bug", Authentication.authenticate, BugController.getBug );



router.post("/projects/:projectId/bug", Authentication.authenticate, Authorization.authorize("qa")  ,upload.single("screenshoot")  ,BugController.addBug );


module.exports = router;