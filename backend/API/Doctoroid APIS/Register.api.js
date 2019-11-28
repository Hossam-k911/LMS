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
      patient.confirm == false;
      resp.json({ message: "Success", patient: patient });
    } catch (err) {
      resp.json({ message: "error adding Patient" });
    }
  });
  app.post("/confirmsignup", async (req, resp) => {
    try {
      const {
        p_id,
        location,
        date,
        /*medicines:medicine_id,*/ confirm
      } = req.body;
      let selectedPatient = await patientModel.findOneAndUpdate(
        { _id: p_id },
        { location, date, confirm /*medicine_id*/ }
      );
      if(selectedPatient.confirm == "false"){

        selectedPatient.confirm = "true";

        await selectedPatient.save();
        
        resp.json({ message: "success", selectedPatient });
      }else{
        resp.json({ message: "error in confirm" });

      }
      
     
    } catch (err) {
      resp.json({ message: "error" });
    }
  });
  app.post("/addmedecinetopatient", async (req, resp) => {
    try{
      const{p_id,m_id} = req.body
     let selectedMedecine = await MedecinesModel.findOne({_id:m_id})
      let result = await patientModel.findOneAndUpdate({_id:p_id},{medicines:selectedMedecine}) 
      await result.save()     
      resp.json({message:"success",result})
    }catch(err){
      resp.json({message:"error updating medicines"})

    }
  });
  
};
