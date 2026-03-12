const {Exception} = require('../helpers')
const {Authorize, ErrorCodes } = require("../constants")
class Authorization{
    static async authorizeQa(req:any,res:any,next:any){
        try {
            console.log("middle ware Authorization ");
            
            console.log(req.user.role.name);
            
            if(req.user.role.name !== 'qa'){
                console.log("Not authorize");
                throw new Exception(Authorize.MESSAGES.NOT_AUTHORIZE_TO_PERFORM_THIS_TASK, ErrorCodes.UNAUTHORIZED, { reportError : true}).toJson();
                
            }
            next();
        } catch (error) {
            
        }

    }

    static authorize(...roles: any){
        return (req:any, res:any, next:any)=>{
            const userRole = req.user.role.name;
            if(!roles.includes(userRole)){
                // throw new Exception(Authorize.MESSAGES.NOT_AUTHORIZE_TO_PERFORM_THIS_TASK, ErrorCodes.UNAUTHORIZED, { reportError : true}).toJson();
                return res.status(403).json({
                message: "Forbidden"
            });
                console.log("Not authorize");
            } 
            next();  
        }
    }
}
module.exports = Authorization