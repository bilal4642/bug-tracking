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

    if (!user) {

      return user;

    }

    delete user.password;

    return user;

  }
}

module.exports = AuthUtil;
