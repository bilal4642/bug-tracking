const {db} = require('../helpers')

const Bug = db.Bug;

class BugHandler{
    static async getAllBugs(req: any){
        const projId = req.params.projectId;
        console.log(projId, "project iid", projId);
        
        const bug = await Bug.findAll({
            where:{
                project_id : projId
            }
        })
        return bug;
    }

    static async AddBug(req:any){
        
        let screenshoot = null;
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
            project_id: req.params.projectId,
            developer_id: req.body.developer_id,
            qa_id: req.user.id,
        }
        
        const bug = await Bug.create(bugObj);
        console.log("bug is",bug, "bug is");
        
        return bug;
    }
}

module.exports = BugHandler;