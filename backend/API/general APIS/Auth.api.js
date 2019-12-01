var PatientsModel = require("../../Models/MedicalModels/patient.model");
const jwt = require("jsonwebtoken");
const config = require('config');
require("dotenv").config();
module.exports = function(app) {
  app.post("/signin", (req, resp) => {
    try {
      const { email, password } = req.body;
      let user = PatientsModel.findOne({ email, password });
      if (user) {
//         //create and assign token
// const accessToken = generateAccessToken(user)
// const refreshedToken = jwt.sign(user,process.env.REFRESH_TOKEN_SECRET)
// resp.json({accessToken:accessToken,refreshedToken:refreshedToken})
        //  const token = jwt.sign({_id:user._id},process.env.ACCESS_TOKEN_SECRET)
        // const token = user.generateAuthToken();
        function generateAccessToken(){
       const token = jwt.sign({
         _id:this._id,
         email:this.email
       },process.env.jwtPrivateKey
       );
       return token;
        }



        const token = generateAccessToken();

        resp.header('x-auth-token',token).send({"x-auth-token":token});
       
      } else {
        resp.json({ message: "error" });
      }
    } catch (error) {
    //  resp.status(error.response.status)
      resp.status(400).send(error.message);
    }
  });

  /// signout
  app.get("/signout", async (req, resp) => {
    await req.session.destroy();
    resp.json({ message: "success" });
  });
};
