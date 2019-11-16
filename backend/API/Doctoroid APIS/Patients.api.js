var mongoose = require("mongoose");
var patientModel = require("../../Models/MedicalModels/patient.model");
var MedecinesModel = require("../../Models/MedicalModels/medicines.model");

module.exports = function(app) {
  app.post("/api/register", async (req, resp) => {
    try {
      const {
        patient_firstName,
        patient_lastName,
        patient_email,
        patient_password,
        patient_phone,
        patient_gender,
        patient_location,
        patient_date,
        medecines: medecine_id
      } = req.body;

      let patient = new patientModel({
        _id: mongoose.Types.ObjectId(),
        patient_firstName,
        patient_lastName,
        patient_email,
        patient_password,
        patient_phone,
        patient_location,
        patient_date,
        patient_gender,
        medicines: medecine_id
        //   doctors: doctor_id
      });
      await patient.save();
      let selectedMedecine = await MedecinesModel.findOne({ _id: medecine_id });
      selectedMedecine.patient.push(patient._id);
      await selectedMedecine.save();
      //

      // let selectedDoctor = await doctorsodel.findOne({ _id: doctor_id });
      // selectedDoctor.patients.push(patient._id);
      // let output = await selectedMedecine.save();

      //
      resp.json({ message: "Success", patients: patient });
    } catch (err) {
      resp.json({ message: "error adding Patient" });
    }
  });
};
