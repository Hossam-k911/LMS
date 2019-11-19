//id .. firstName,last,email,password,phone,gender
//2:

var mongoose = require("mongoose");
var patientModel = require("../../Models/MedicalModels/patient.model");
// var MedecinesModel = require("../../Models/MedicalModels/medicines.model");
module.exports = function(app) {
  app.post("/signup", async (req, resp) => {
    try {
      const {
        mob_id,
        firstName,
        lastName,
        email,
        password,
        phone,
        gender,
        // location,
        // date
        confirm
        // medecines: medecine_id
      } = req.body;

      let patient = new patientModel({
        _id: mongoose.Types.ObjectId(),
        mob_id,
        firstName,
        lastName,
        email,
        password,
        phone,
        // location,
        // date,
        gender,
        confirm
        // medicines: medecine_id
        //   doctors: doctor_id
      });
      await patient.save();
      // let selectedMedecine = await MedecinesModel.findOne({ _id: medecine_id });
      // selectedMedecine.patient.push(patient._id);
      // await selectedMedecine.save();
      //

      // let selectedDoctor = await doctorsodel.findOne({ _id: doctor_id });
      // selectedDoctor.patients.push(patient._id);
      // let output = await selectedMedecine.save();

      //
      resp.json({ message: "Success", patient: patient });
    } catch (err) {
      resp.json({ message: "error adding Patient" });
    }
  });
  
};
