//id .. firstName,last,email,password,phone,gender
//2:

var mongoose = require("mongoose");
var patientModel = require("../../Models/MedicalModels/patient.model");
var MedecinesModel = require("../../Models/MedicalModels/medicines.model");
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
        confirm // false
      } = req.body;

      var patient = new patientModel({
        _id: mongoose.Types.ObjectId(),
        mob_id,
        firstName,
        lastName,
        email,
        password,
        phone,
        gender,
        confirm
      });
      await patient.save();

      resp.json({ message: "Success", patient: patient });
    } catch (err) {
      resp.json({ message: "error adding Patient" });
    }
  });

  // app.post("/confirmsignup", async (req, resp) => {
  //   try {
  //     const {
  //       p_id,
  //       location,
  //       date,
  //       medicines: medicine_id,
  //       confirm
  //     } = req.body;

  //     let p1 =  new patientModel({
  //       p_id,
  //       location,
  //       date,
  //       medicine_id,
  //       confirm
  //     });

  //     let selectedPatient = await patientModel.findOne({ _id: p_id });
  //     selectedPatient.confirm === true;
  //     selectedMedecine.patient.push(location,date,confirm,medecine_id);
  //      await selectedPatient.save();

  //     let selectedMedecine = await MedecinesModel.findOne({ _id: medecine_id });
  //     selectedMedecine.patient.push(patient._id);

  //     resp.json({ message: "success", patient });
  //     await p1.save();

  //     // let selectedDoctor = await doctorsodel.findOne({ _id: doctor_id });
  //     // selectedDoctor.patients.push(patient._id);
  //     // let output = await selectedMedecine.save();
  //   } catch (err) {
  //     resp.json({ message: "error in confirm signup" });
  //   }
  // });

  app.post("/confirmsignup", async (req, resp) => {
    try {
      const { p_id, location, date, /*medicines:medicine_id,*/ confirm } = req.body;
      let selectedPatient = await patientModel.findOneAndUpdate(
        { _id: p_id },
      { location, date, confirm ,/*medicine_id*/}
      );
      selectedPatient.confirm == true;

      await selectedPatient.save();
      //  let selectedMedecine = await MedecinesModel.findOne({_id: medicine_id });
      // selectedMedecine.patient.push(patient._id);
      //  await selectedMedecine.save();
      // let selectedMedecine = await MedecinesModel.findOne({ _id: d_id })
      //  selectedMedecine.patient.push(medicines.medecine_id)
      // let output = await selectedMedecine.save()
     resp.json({ message: "success", selectedPatient });


     
    } catch (err) {
      resp.json({ message: "error" });

    }
  });
};
