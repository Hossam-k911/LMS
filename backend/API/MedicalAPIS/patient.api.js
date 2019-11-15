var mongoose = require("mongoose");
var patientModel = require("../../Models/MedicalModels/patient.model");
var MedecinesModel = require("../../Models/MedicalModels/medicines.model");

module.exports = function createPatientsAPIS(app) {
  
  app.get("/getpatients", async (req, resp) => {
    try {
      let patients = await patientModel.find({});
      resp.json({ message: "success", patients });
    } catch (err) {
      resp.json({ message: "error fetching patients" });
    }
  });
};
