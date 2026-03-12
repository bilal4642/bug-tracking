const AuthManager = require("./AuthManager");

class AuthController {
  static async signup(req: any, res: any) {
    try {
      const user = await AuthManager.signup(req.body);
      console.log(user, "user");

      res.json({
        success: true,
        data: user,
      });
    } catch (error) {
      console.log(
        `signup:: Request to sign up user failed. data:: `,
        req.body,
        error,
      );
    }
  }

  static async login(req: any, res: any){
    try {
        console.log("login route");
        
        const user = AuthManager.login(req.body);

        res.json({
            success: true,
            data: user
        });
    } catch (error) {
        console.log(error);
    }
  }
}

module.exports = AuthController;
