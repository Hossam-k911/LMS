var PatientsModel = require("../../Models/MedicalModels/patient.model");
const jwt = require("jsonwebtoken");
// const bcrypt = require("bcryptjs");
require("dotenv").config();
module.exports = function(app) {
  function generateAccessToken() {
    const token = jwt.sign(
      {
        _id: this._id,
        email: this.email
      },
      process.env.jwtPrivateKey
    );
    return token;
  }
  app.post("/signin", async (req, resp) => {
    let user = await PatientsModel.findOne({
      email: req.body.email,
      password: req.body.password
    });
    if (!user) resp.status(401).send("Invalid email or password.");

    if (user) {
      //         //create and assign token

      const token = generateAccessToken();

      resp.header("x-auth-token", token).send({ token });
    } else {
      resp.status(400).send(error.message);
    }
  });

  /// signout
  app.get("/signout", async (req, resp) => {
    await req.session.destroy();
    resp.status(200).send("success");
  });
};
