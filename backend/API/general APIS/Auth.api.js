var PatientsModel = require('../../Models/MedicalModels/patient.model')
var jwt = require('jsonwebtoken')
require('dotenv').config();
module.exports = function(app){
    app.post("/signin", (req, resp) => {
       try{
       
       
        const { email, password} = req.body;
        let user =  PatientsModel.findOne({ email, password });
        if (user) {
          //create and assign token 
          const token = jwt.sign({email:user.email},process.env.ACCESS_TOKEN_SECRET)
    
          resp.header('x-auth-token',token).send({"x-auth-token":token});
        } else {
          resp.json({ message: "error" });
        }
       }catch(error){
          //  resp.status(error.response.status)
          resp.status(400).send(error.message);
       }
      });


      /// signout
      app.get("/signout", async (req,resp) => {
        await req.session.destroy();
        resp.json({ message: "success" });
      });
}