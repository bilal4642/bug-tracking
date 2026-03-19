// const { bcrypt } = require("../helpers");
const bcrypt = require("bcrypt");
const { Exception, Validators } = require("../helpers");
const { UserConstants, ErrorCodes } = require("../constants");
class AuthUtil {
  static async createHashedPassword(password: string) {
    try {
      const hashed = await bcrypt.hash(password, 10);
      console.log(hashed);

      return hashed;
    } catch (error) {
      console.log("hash error", error);
    }
  }
  static validateSignUpRequest(data: any) {
    if (!data || !data.email) {
      throw new Exception(
        UserConstants.MESSAGES.INVALID_DATA_TO_SIGNUP_USER,
        ErrorCodes.BAD_REQUEST,
        { reportError: true },
      ).toJson();
    }

    if (data.email && !Validators.isValidateEmail(data.email)) {
      throw new Exception(
        UserConstants.MESSAGES.INVALID_EMAIL,
        ErrorCodes.BAD_REQUEST,
        { reportError: true },
      ).toJson();
    }
    if (!Validators.isValidPassword(data.password)) {
      throw new Exception(
        UserConstants.MESSAGES.INVALID_PASSWORD,
        ErrorCodes.BAD_REQUEST,
        { reportError: true },
      ).toJson();
    }
  }

  static validateUserForSignUp(user: any) {
    if (user) {
      console.log(
        `validateUserForSignUp:: User already exist against this email. user:: `,
        user,
      );

      throw new Exception(
        UserConstants.MESSAGES.USER_ALREADY_EXIST,
        ErrorCodes.BAD_REQUEST,
        { reportError: true },
      ).toJson();
    }
  }
  static updateUserData (user: any) {
    
    console.log("The The dta is in updateUser Functions dta is in updateUser Functions");
    console.log(user);
    
    
    if (!user) {

      return user;

    }

    delete user.password;

    return user;

  }
  static validateLoginRequest (data:any) {
  
      if (!data || (!data.email)) {
  
        console.log(`validateLoginRequest:: Invalid data to login user. data:: `, data);
  
        throw new Exception(UserConstants.MESSAGES.INVALID_DATA_TO_LOGIN, ErrorCodes.UNAUTHORIZED, { reportError: true }).toJson();
  
      }
  
      if (data.email && !Validators.isValidateEmail(data.email)) {
  
        console.log(`validateLoginRequest:: Invalid email to login user. data:: `, data);
  
        throw new Exception(UserConstants.MESSAGES.INVALID_EMAIL, ErrorCodes.UNAUTHORIZED, { reportError: true }).toJson();
  
      }
  
      if (!Validators.isValidStr(data.password)) {
  
        console.log(`validateLoginRequest:: Invalid password to login user. data:: `, data);
  
        throw new Exception(UserConstants.MESSAGES.INVALID_PASSWORD, ErrorCodes.UNAUTHORIZED, { reportError: true }).toJson();
  
      }
  
    }
    static validateUserToAuthenticate (user:any) {
    
        if (!user) {
    
          console.log(`validateUserToAuthenticate:: User does not exist. user:: `, user);
    
          throw new Exception(UserConstants.MESSAGES.USER_DOES_NOT_EXIST, ErrorCodes.BAD_REQUEST, { reportError: true }).toJson();
    
        }
    
      }
}

module.exports = AuthUtil;
