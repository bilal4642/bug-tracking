const { db } = require("../helpers");
const sendEmail = require('../services/emailServices')
const Project = db.Project;
const Project_Members = db.Project_Members;
const {UserHandler} = require('./UserHandler')
const { emailQueue } = require('../queues/emailQueue')

class ProjectHandler{
    static async getAllProjects(user: any){
        let projects;
        console.log('logggggggggggggggggggggggggggggggggggggggg', user.role);
        
        const users = user.toJSON();
        if(user.role.name === 'manager'){
            const userId = users.id
            projects = await Project.findAll({    
            where: {
                manager_id: userId
            },
            include:[
                {
                    model: Project_Members,
                    as:  "members"
                }
            ],
             
        })
        }
        if(user.role.name === 'developer'  || user.role.name === 'qa'){
            console.log("qaqaqaqaqaqaqaqaqaqaqaqaqaqaqaqaqaqaqaqaqaqaqaqaqaqaqaqa");
            console.log(user.id);
            
            projects = await Project.findAll({
            //      include:[
            //         {
            //             model : Project_Members,
            //             where: { user_id: users.id }
            //         },
            //     {
            //         model: Project_Members,
            //         as:  "members"
            //     }
            // ]
                include: [
                    {
                        model: Project_Members,
                         as: "members",
                        where: { user_id: user.id }
                    }
                ],
                logging: console.log
            })

            console.log("Projects", projects, "projects");
        }
        
        
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
        req.body.developers.forEach((devId:number)=>{
            members.push({
                project_id: project.id,
                user_id:  devId,
                role_id: 2
            })
        })
        req.body.qas.forEach((qaId:number) =>{
            members.push({
                project_id: project.id,
                user_id: qaId,
                role_id: 3
            })
        })
        for(const devId of req.body.developers){
            const userAsDev = await UserHandler.findUserById(devId);
            // setImmediate(()=>{
            //     sendEmail(
            //         userAsDev.email,
            //         project.name,
            //         project.description
            //     )
            // })
            await emailQueue.add("sendEmail", {
                to: userAsDev.email,
                subject:  project.name,
                text: project.description
            })
        }
        for(const qaId of req.body.qas){
            const userAsQa = await UserHandler.findUserById(qaId);
            
            //  await emailQueue.add("sendEmail", {
            //     to: userAsQa.email,
            //     subject:  project.name,
            //     text: project.description
            // })



            // setImmediate(()=>{
            //     sendEmail(
            //         userAsQa.email,
            //         project.name,
            //         project.description
            //     )
            // })
        }
        const proj_member = await Project_Members.bulkCreate(members);
        return {
            project,
            proj_member
        };
    }
    static async deleteProject(req:any){
        const productId = req.params.id;
        const deleted_product = await Project.destroy({
            where:{
                id: productId
            }
        }) 
        return deleted_product;
    }

   

   
}

module.exports = ProjectHandler