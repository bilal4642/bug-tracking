const {UserHandler} = require("../../handlers")


class UserRoleManager{
    static async getUserRole(){
        const userRole = await UserHandler.getUserRole();
        return userRole;
    }
}

module.exports = UserRoleManager