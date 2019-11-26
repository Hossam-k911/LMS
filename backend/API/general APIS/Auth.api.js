var PatientsModel = require('../../Models/MedicalModels/patient.model')

module.exports = function(app){
    app.post("/signin", async (req, resp) => {
        const { email, password } = req.body;
        let user = await PatientsModel.findOne({ email, password });
        if (user) {
          req.session.user = user;
          resp.json({ message: "success", user });
        } else {
          resp.json({ message: "error" });
        }
      });
      app.get("/signout", async (req,resp) => {
        await req.session.destroy();
        resp.json({ message: "success" });
      });
}