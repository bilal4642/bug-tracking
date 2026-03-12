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
}

module.exports = BugManager