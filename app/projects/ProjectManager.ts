const {ProjectHandler} = require("../../handlers")
class ProjectManager{
    static async getProjects(user: any){
        const projects = await ProjectHandler.getAllProjects(user.id);
        // console.log(user.id, "ididididi", user.id);
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
}

module.exports = ProjectManager