var mongoose = require("mongoose");
var patientModel = require("../../Models/MedicalModels/patient.model");
var medicinesModel = require("../../Models/MedicalModels/medicines.model");

module.exports = function createPatientsAPIS(app) {
  app.post("/addmedecine", async (req, resp) => {
    try {
      const {
        medicineName,
        medicinePrice,
        medicineDescription,
        medicineQuantity
      } = req.body;
      let medecine = new medicinesModel({
        _id: mongoose.Types.ObjectId(),
        medicineName,
        medicinePrice,
        medicineDescription,
        medicineQuantity
      });
      await medecine.save();

      resp.json({ message: " medecine added", result: medecine });
    } catch (err) {
      resp.json({ message: "error adding medecine" });
    }
  });
  app.get('/getmedecines',async(req,resp)=>{
    try{
      
   let medecines= await medicinesModel.find({})
   resp.json({message:"success",result:medecines})
    }
    catch(err){
   resp.json({message:"error fetching medecines"})

    }
  })
};
