const {db} = require('../helpers')
const sendEmail = require('../services/emailServices')
const Bug = db.Bug;
const { UserHandler } = require('./UserHandler');
const {emailQueue} = require('../queues/emailQueue')

class BugHandler{
    static async getAllBugs(req: any){
        const projId = req.params.projectId;
        console.log(projId, "project iid", projId);
        
        const bug = await Bug.findAll({
            where:{
                project_id : projId
            },
            order :[
                ['createdAt', 'ASC']
            ]
        })
        return bug;
    }

    static async AddBug(req:any){
        
        let screenshoot = null;
        screenshoot = "imgur.pgn"
        if(req.file){
            screenshoot = `/uploads/bugs/${req.file.filename}`;
        }
        const {title, description, deadline,bug_type, status } = req.body;
        const projectId = req.params.projectId;
        const bugObj = {
            title,
            description,
            deadline,
            screenshoot,
            bug_type,
            status,
            project_id: req.body.project_id,
            developer_id: req.body.developer_id,
            qa_id: req.user.id,
        }
        console.log(bugObj, "bug obj bug obj bug obj bug obj bug obj bug obj");
        
        const bug = await Bug.create(bugObj);
        // console.log("bug is",bug, "bug is");

        const user = await UserHandler.findUserById(bug.developer_id);
        console.log(user);
        // return;
        console.log("user user user user user is isisisisissi is user", user.id);
        
        
        // setImmediate(()=>{
        //     sendEmail(
        //         user.email,
        //         bug.title,
        //         bug.description
        //     )
        // });
        await emailQueue.add("sendEmail", {
            to: user.email,
            subject: bug.title,
            text: bug.description
        })
        
        return bug;
    }

    static async updateStatus(req: any){
        const { bugId } = req.params;
        const { status } = req.body;

        console.log(bugId, "bugId", status, "status");
        // return;
        const bug = await Bug.findByPk(bugId);
        

        const data = await bug.update({status})
        return data;

    }
    static async deletedBug(req:any){
        const { Id } = req.params;
        console.log(Id, "bug id is ");
        const deletedBug = await Bug.destroy({
            where: {id: Id}
        })
        
        return deletedBug;
    }
}

module.exports = BugHandler;