var mongoose = require("mongoose");
var patientModel = require("../../Models/MedicalModels/patient.model");
var MedecinesModel = require("../../Models/MedicalModels/medicines.model");

module.exports = function createPatientsAPIS(app) {
  app.get("/getpatients", async (req, resp) => {
    try {
      let patients = await patientModel.find({});
      resp.json({ message: "success", result: patients });
    } catch (err) {
      resp.json({ message: "error fetching patients" });
    }
  });

  app.post("/removepatient", async (req, resp) => {
    try {
      const { p_id } = req.body;
      let result = await patientModel.remove({ _id: p_id });
      resp.json({ message: "success", p_id });
    } catch (err) {
      resp.json({ message: "error deleting patient" });
    }
  });

  app.get('/removeallpatients', async (req, resp) => {
    let output = await patientModel.remove({})
    resp.json({ message:"success", result: output })
})


  app.post("/getpatientbyid", async (req, resp) => {
    try {
      const { p_id } = req.body;
      let output = await patientModel.findOne({ _id: p_id });
      resp.json({ message: "suceess", result: output });
    } catch (err) {
      resp.json({ message: " recheck patient ID" });
    }
  });
  
  app.post('/updatepatient', async (req, resp) => {
  try{
    const {
      p_id, mob_id,
      firstName,
      lastName,
      email,
      password,
      phone,
      gender,
      // location,
      // date
  } = req.body
 
  let output = await patientModel.findOneAndUpdate({ _id: p_id },{mob_id,firstName,lastName,email,password,phone,gender})
      resp.json({ message:"success",result: output })
 
  }catch(err){
    resp.json({ message:"error in editing patient" })

  }
    
})
};