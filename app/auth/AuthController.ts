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
    } catch (error:any) {
        return res.status(error.code || 500).json({
          success: false,
          message: error.reportError ? error.message : "Enter Valid Data"
        });
    }
  }

  static async login(req: any, res: any){
    try {
        console.log("login route");
        
        const user =await AuthManager.login(req.body);

        res.json({
            success: true,
            data: user
        });
    } catch (error:any) {
      console.log("Catch errrorororororororo");
      
        return res.status(error.code || 500).json({
          success: false,
          message: error.reportError ? error.message : "Enter Valid Data"
        });
    }
  }
}

module.exports = AuthController;
