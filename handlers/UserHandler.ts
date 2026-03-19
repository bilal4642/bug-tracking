const { db } = require("../helpers");
const{Op} = require('sequelize');
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
    return User.findOne({ where:  { 
      email:email 
      },
      include: [{
        model: User_Types,
        as: "role"
        }
      ] 
    }
  );
  }

  static async findUserById(id:any){
    const user = await User.findByPk(id);
    return user;
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
  static async getUserRole(){
    const userRole = await User_Types.findAll();
    return userRole;
  }

   static async getProjectUser(req: any){
        const projUser = await User.findAll({
          where: {
            user_type_id :{
              [Op.in] : [2,3]
            }
          }
        })
        // console.log("all users data is");
        
        // console.log(projUser);
        const developers = projUser.filter((user:any)=>user.user_type_id === 2)
                                    .map((user:any)=>user.toJSON());

        const qas = projUser.filter((user:any)=>user.user_type_id === 3)
                            .map((user:any)=>user.toJSON());
        console.log(developers);
        console.log(qas);
        
        
        const data = {
          developers,
          qas
        }
        console.log("Data is like this one");
        
        console.log(data);
        
        return data;

    }

}

module.exports = {UserHandler};
