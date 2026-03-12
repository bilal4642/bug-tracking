const { db } = require("../helpers");

const User = db.User;
const User_Types = db.User_Types
class UserHandler {
  static createUser(data: any) {
    const { email, name, password, user_type_id } = data;
    const user = {
      name: name,
      email: email,
      password,
      user_type_id,
    };
    const users = User.create(user);
    return users;
  }
  static findUserByEmail(email: string) {
    return User.findOne({ where: { email } });
  }

  static setAccessToken(userId: Number, accessToken: String, refreshToken: String){
    return User.update({
        access_token: accessToken,
        refresh_token: refreshToken,
    },{
        where: {
            id: userId,
        },
        returning: '*'
    },
    );
  }
  static async getAuthenticateUser(id: any, email:any, token: String){
    console.log(id, email, token);
    
    const user = await User.findOne({ where: {
        email: email,
        id: id,
        access_token: token
    },
      include: [
        {
          model: User_Types,
          as: "role"
        }
      ]
    })
    return user;
    
  }

}

module.exports = {UserHandler};
