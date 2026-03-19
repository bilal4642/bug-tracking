const {UserHandler,ProjectHandler} = require("../../handlers")
class ProjectManager{
    static async getProjects(user: any){
        const projects = await ProjectHandler.getAllProjects(user);
        return projects
    }

    static async addProject(req: any){
        const project = await ProjectHandler.addProject(req);
        return project
    }
    static async getProjectById(req:any){
        const project = await ProjectHandler.getProjectById(req);
        return project;
    }
    static async deleteProject(req:any){
        const project = await ProjectHandler.deleteProject(req);
        return project;
    }

    static async getProjectUser(req:any){
        const projUser = await UserHandler.getProjectUser(req);
        return projUser;
    }
}

module.exports = ProjectManager