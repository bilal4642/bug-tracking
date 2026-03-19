const BugManager = require("./BugManager");

class BugController{

    static async getBug(req: any, res: any){
        console.log("controller");
        
        const bug = await BugManager.getBug(req);
        
        res.json({
            success: true,
            data: bug
        })
        
    }

    static async addBug(req:any, res: any){
        console.log("bug controller bug controller bug controller");
        console.log(req);
        
        
        try {
            const bug = await BugManager.addBug(req);
            // console.log(bug);
            
            res.json({
                success: true,
                data: bug
            })
        } catch (error) {
            console.log(error);
        }
    }

    static async updateStatus(req:any, res: any){
        try {
            const updatedBugStatus = await BugManager.updateStatus(req);
            res.json({
                success: true,
                data: updatedBugStatus
            })
        } catch (error) {
            console.log(error);
        }
    }
    static async deleteBug(req: any, res: any){
        try {
            const deletedUser = await BugManager.deletedBug(req)
            res.json({
                success: true,
                data: deletedUser
            })
            console.log("Bug delete controller");
            
        } catch (error) {
            
        }
    }
}

module.exports = BugController