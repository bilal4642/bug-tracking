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
}

module.exports = BugController