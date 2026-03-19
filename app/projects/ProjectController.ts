const ProjectManager = require("./ProjectManager");

class ProjectController{
    static async getProjects(req: any, res: any){
        try {
            const projects = await ProjectManager.getProjects(req.user);
            // console.log(projects, "pppppppppppppppppppppp");
            
            res.json({
                success: true,
                data: projects
            })

        } catch (error) {
            
        }
        
    }

    static async addProject(req:any, res: any){
        try {
            // console.log(req.body, "hjsfhjshfjhajshfj");
            
            const project = await ProjectManager.addProject(req)

            res.json({
                success: true,
                data: project
            })
        } catch (error) {
            
        }
    }

    static async getProjectById(req:any,res:any){

        const project = await ProjectManager.getProjectById(req);
        res.json({
                success: true,
                data: project
            })
    }

    static async deleteProject(req:any, res: any){
        const project = await ProjectManager.deleteProject(req);
        res.json({
                success: true,
                data: project
            })

    }

    static async getProjectUser(req: any, res: any){
        try {   
            console.log("all project user");
            
            const projUser = await ProjectManager.getProjectUser(req.user);
            res.json({
                success: true,
                data: projUser
            })
            
        } catch (error) {
            
        }
    }
}

module.exports = ProjectController