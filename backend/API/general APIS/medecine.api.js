var mongoose = require("mongoose");
var patientModel = require("../../Models/MedicalModels/patient.model");
var medicinesModel = require("../../Models/MedicalModels/medicines.model");

module.exports = function createPatientsAPIS(app) {
  app.post("/addmedicine", async (req, resp) => {
    try {
      const {
        medicineName,
        medicinePrice,
        medicineDescription,
        medicineQuantity
      } = req.body;
      let medicine = new medicinesModel({
        _id: mongoose.Types.ObjectId(),
        medicineName,
        medicinePrice,
        medicineDescription,
        medicineQuantity
      });
      await medicine.save();

      resp.json({ message: " medicine added", result: medicine });
    } catch (err) {
      resp.json({ message: "error adding medecine" });
    }
  });
  app.get('/getmedicines',async(req,resp)=>{
    try{
      
   let medicines= await medicinesModel.find({})
   resp.json({message:"success",result:medicines})
    }
    catch(err){
   resp.json({message:"error fetching medecines"})

    }
  })
};
