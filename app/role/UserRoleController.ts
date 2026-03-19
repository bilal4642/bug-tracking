const UserRoleManager = require('./UserRoleManager')
class UserRoleController{
    static async getUserRole(req: any, res: any){
        try {
            const userRole = await UserRoleManager.getUserRole();

            res.json({
                success: true,
                data: userRole
            })
            
        } catch (error) {
            
        }
    }
}

module.exports = UserRoleController