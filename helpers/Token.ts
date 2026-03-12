const jsonwebtoken = require("jsonwebtoken");
const config = require("config");
class Token {
  static getLoginToken(user: any) {
    const loginToken = jsonwebtoken.sign(
      {
        id: user.id,
        email: user.email,
      },
      config.secretKey,{
        expiresIn: config.timeouts.login,
      },
    );
    return loginToken;
  }

  static getRefreshToken(user: any){
    const refreshToken = jsonwebtoken.sign({
        id: user.id,
        email: user.email
    }, config.secretKey,{
        expiresIn: config.timeouts.refreshToken
    })
    return refreshToken;
  }
}

module.exports =  Token 
