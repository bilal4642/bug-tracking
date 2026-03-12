const { db } = require("../helpers");

const Project = db.Project;
const Project_Members = db.Project_Members;

class ProjectHandler{
    static async getAllProjects(userId: any){
        const projects = await Project.findAll({
            where: {
                manager_id: userId
            },
            include:[
                {
                    model: Project_Members,
                    as:  "members"
                }
            ]
        })
        console.log("Projects", projects, "projects");
        
        return projects;
        
    }
    static async getProjectById(req:any){
        const projectId = req.params.id;
        console.log("projectId projectId projectId projectId projectId");
        
        console.log(projectId);
        
        const project = await Project.findOne({
            where:{
                id : projectId
            }
        })
        return project;
    }
    static async addProject(req:any){
        const {name, description} = req.body;
        const managerId = req.user.id;
        console.log(name, "namename name", description, " description is all about", managerId, "managerId is");
        const proj ={
            name,
            description,
            manager_id: managerId
        }
        const project = await Project.create(proj);
        const members: any = [];
        req.body.developers.forEach((devId:Number)=>{
            members.push({
                project_id: project.id,
                user_id:  devId,
                role_id: 2
            })
        })
        req.body.qas.forEach((qaId:Number) =>{
            members.push({
                project_id: project.id,
                user_id: qaId,
                role_id: 3
            })
        })
        const proj_member = await Project_Members.bulkCreate(members);
        return {
            project,
            proj_member
        };
    }
}

module.exports = ProjectHandler