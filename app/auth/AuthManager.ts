const { AuthUtil } = require("../../utilities");

const {UserHandler} = require("../../handlers");

const { Token, bcrypt } = require("../../helpers");

class AuthManager {
  static async signup(data: any) {
    // AuthUtil.validateSignUpRequest(data);
    let user = await UserHandler.findUserByEmail(data.email);
    // console.log(data);

    // AuthUtil.validateUserForSignUp(user);
    data.password = await AuthUtil.createHashedPassword(data.password);
    // console.log(data);
    // console.log("data is ");
    

    user = await UserHandler.createUser(data);

    user = await AuthManager.setAccessToken(user);
    console.log(user, "user user");

    return user;
  }

  static async setAccessToken(user: any) {
    console.log(`setAccessToken:: Setting access token of user. user:: `, user);

    const accessToken = Token.getLoginToken(user);

    const refreshToken = Token.getRefreshToken(user);

    const [_,[updatedUser]] = await UserHandler.setAccessToken(user.id, accessToken, refreshToken);

    user = AuthUtil.updateUserData(updatedUser.toJSON());

    return user;
  }

  static async login(data: any){
      
      let user = await UserHandler.findUserByEmail(data.email);
      
      const passwordMatch = await bcrypt.compare(data.password, user.password);
      console.log("login routtttttt");

    user = await AuthManager.setAccessToken(user);

    console.log(user);
    
    return user;
    

  }
}
module.exports = AuthManager;
