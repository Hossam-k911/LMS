var mongoose = require("mongoose");
var patientModel = require("../../Models/MedicalModels/patient.model");
var medicinesModel = require("../../Models/MedicalModels/medicines.model");

module.exports = function createPatientsAPIS(app) {
  app.post("/addmedecine", async (req, resp) => {
    try {
      const {
        medicine_name,
        medicine_price,
        medicine_description,
        medicine_quantity
      } = req.body;
      let medecine = new medicinesModel({
        _id: mongoose.Types.ObjectId(),
        medicine_name,
        medicine_price,
        medicine_description,
        medicine_quantity
      });
      await medecine.save();
      resp.json({ message: " medecine added", medecine });
    } catch (err) {
      resp.json({ message: "error adding medecine" });
    }
  });
  app.get('/getmedecines',async(req,resp)=>{
    try{
      
   let medecines= await medicinesModel.find({})
   resp.json({message:"success",medecines})
    }
    catch(err){
   resp.json({message:"error fetching medecines"})

    }
  })
};
