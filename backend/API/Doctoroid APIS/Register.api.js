var mongoose = require("mongoose");
var patientModel = require("../../Models/MedicalModels/patient.model");
var MedecinesModel = require("../../Models/MedicalModels/medicines.model");
// const bcrypt = require("bcryptjs");
module.exports = function(app) {
  app.post("/signup", async (req, resp) => {
    try {
      const {
        firstName,
        lastName,
        email,
        password,
        phone,
        gender,
        confirm // false
      } = req.body;

      var patient = new patientModel({
        _id: mongoose.Types.ObjectId(),
        firstName,
        lastName,
        email,
        password,
        phone,
        gender,
        confirm
      });
      await patient.save();
      patient.confirm == false;
      resp.status(200).send(patient);
    } catch (err) {
      resp.status(400).send("error in adding Patient");
    }
  });
  app.post("/confirmsignup", async (req, resp) => {
    try {
      const { p_id, location, date, confirm } = req.body;
      let selectedPatient = await patientModel.findOneAndUpdate(
        { _id: p_id },
        { location, date, confirm }
      );
      if (selectedPatient.confirm == "false") {
        selectedPatient.confirm = "true";

        await selectedPatient.save();

        resp.status(200).send(selectedPatient);
      } else {
        resp.status(400).send("error in confirming signup");
      }
    } catch (err) {
      resp.status(400).send("error in confirming signup");

    }
  });
  app.post("/addmedecinetopatient", async (req, resp) => {
    try {
      const { p_id, m_id } = req.body;
      let selectedMedecine = await MedecinesModel.findOne({ _id: m_id });
      let result = await patientModel.findOneAndUpdate(
        { _id: p_id },
        { medicines: selectedMedecine }
      );
      await result.save();
      resp.status(200).json( result );
    } catch (err) {
      resp.status(400).send("error in Updating Medicines");

    }
  });
};
