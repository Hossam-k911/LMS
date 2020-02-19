var mongoose = require("mongoose");
var adminModel = require("../../Models/AdminModel/admin.model");
const jwt = require("jsonwebtoken");
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
  app.post("/dashboard/signup", async (req, resp) => {
    try {
      const { email, password } = req.body;
      let admin = new adminModel({
        _id: mongoose.Types.ObjectId(),
        email,
        password
      });
      await admin.save();
    resp.status(200).json(admin);
    } catch (err) {
    resp.status(400).json("error");

    }
  });
  app.post("/dashboard/signin", async (req, resp) => {
    let user = await adminModel.findOne({
      email: req.body.email,
      password: req.body.password
    });
    if (!user) resp.status(401).send("Invalid email or password.");

    if (user) {
      //         //create and assign token

      const token = generateAccessToken();
     
      resp.header("x-auth-token", token).send({"x-auth-token":token})
      // resp.status(200).json(user);
    } else {
    //   resp.status(400).send(error.message);
    resp.status(400).json("error in signIn");

    }
  });

};

