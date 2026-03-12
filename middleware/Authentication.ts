import decode = require("node:punycode");
import nodePunycode = require("node:punycode");

const { Validators, Exception, jwt, config } = require("../helpers")
const { ErrorCodes, UserConstants} = require('../constants');
const {UserHandler} = require("../handlers")

class Authentication{
    static async authenticate(req: any, res: any, next: any){
        try {
            console.log('middleware is');
            
            let token = Validators.isValidStr(req.headers.authorization) ? req.headers.authorization.split(' ') : null;

            if (!Array.isArray(token) || token.length < 1) {
            
                    console.log(`authenticate:: Token is invalid. token:: `, token);
            
                    throw new Exception(UserConstants.MESSAGES.TOKEN_IS_INVALID_OR_EXPIRED, ErrorCodes.CONFLICT_WITH_CURRENT_STATE, { reportError: true }).toJson();
            
                }
            token = token[1];
                                                                   

            console.log(token, "coming her", jwt , config.secretKey);
            
            const decoded = jwt.verify(token, config.secretKey);
                
            const user = await UserHandler.getAuthenticateUser(decoded.id, decoded.email, token);
            console.log(user, "user");
            
            req.user = user;

            next();
        } catch (error) {
            console.log(error);
            
        }

    }
}

module.exports = Authentication