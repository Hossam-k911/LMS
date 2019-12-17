var mongoose = require("mongoose");
var patientModel = require("../../Models/MedicalModels/patient.model");
var MedecinesModel = require("../../Models/MedicalModels/medicines.model");

module.exports = function createPatientsAPIS(app) {
  app.get("/getpatients", async (req, resp) => {
    try {
      let patients = await patientModel.find({});
      resp.status(200).send(patients);
    } catch (err) {
      resp.status(400).send("error in getting patients");
    }
  });

  app.post("/removepatient", async (req, resp) => {
    try {
      const { p_id } = req.body;
      let result = await patientModel.remove({ _id: p_id });
      resp.status(200).json(result);
    } catch (err) {
      resp.status(400).send("error in removing Patient");
    }
  });

  // app.get("/removeallpatients", async (req, resp) => {
  //   let output = await patientModel.remove({});
  //   resp.json({ message: "success", result: output });
  // });

 

  app.post("/updatepatient", async (req, resp) => {
    try {
      const {
        p_id,
        firstName,
        lastName,
        email,
        password,
        phone,
        gender,
        location,
        date,
        medicines: m_id
      } = req.body;

      let output = await patientModel.findOneAndUpdate(
        { _id: p_id },
        {
          firstName,
          lastName,
          email,
          password,
          phone,
          gender,
          location,
          date,
          m_id
        }
      );
      await output.save();
      resp.status(200).json(output);
    } catch (err) {
      resp.status(400).json("error in editing patient");
    }
  });
};
