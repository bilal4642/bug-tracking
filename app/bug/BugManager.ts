const {BugHandler} = require("../../handlers")


class BugManager{
    static async getBug(req: any){
        // console.log(user.id, "userid", user.id);
        
        const bug = BugHandler.getAllBugs(req);
        return bug;
    }

    static async addBug(req: any){
        const bug = await BugHandler.AddBug(req);
        // console.log(bug);
        
        return bug;
    }

    static async updateStatus(req: any){
        const data = await BugHandler.updateStatus(req);
        return data;
    }

    static async deletedBug(req: any){
        const user = await BugHandler.deletedBug(req);
        return user;
    }
}

module.exports = BugManager