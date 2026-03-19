const { AuthUtil } = require("../../utilities");

const {UserHandler} = require("../../handlers");

const { Token, bcrypt, Exception } = require("../../helpers");
const { UserConstants, ErrorCodes } = require("../../constants");

class AuthManager {
  static async signup(data: any) {

    AuthUtil.validateSignUpRequest(data);
    console.log("dataaa");
    
    

    let user = await UserHandler.findUserByEmail(data.email);
    // console.log(data);

    AuthUtil.validateUserForSignUp(user);
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
    user.access_token = accessToken;
    user.refresh_token = refreshToken;
    
    user = AuthUtil.updateUserData(user.toJSON());

    return user;
  }

  static async login(data: any){

    AuthUtil.validateLoginRequest(data);
      
    let user = await UserHandler.findUserByEmail(data.email);

    AuthUtil.validateUserToAuthenticate(user);
      
    const passwordMatched = await bcrypt.compare(data.password, user.password);

     if (!passwordMatched) {
    
          console.log(`login:: Password does not match. users:: ${JSON.stringify(user)} data:: `, data);
    
          throw new Exception(UserConstants.MESSAGES.PASSWORD_DOES_NOT_MATCH, ErrorCodes.UNAUTHORIZED, { reportError: true }).toJson();
    
        }
        
        user = await AuthManager.setAccessToken(user);
        
        console.log("login routtttttt");
    console.log(user);
    console.log("userrrrrrrrrrrrrrrrrrrr");
    
    return user;
    

  }
}
module.exports = AuthManager;
