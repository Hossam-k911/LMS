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

      resp.status(200).json(medicine);
    } catch (err) {
      resp.status(400).json("error adding medecine");
    }
  });
  app.get("/getmedicines", async (req, resp) => {
    try {
      let medicines = await medicinesModel.find({});
      resp.status(200).json(medicines);
    } catch (err) {
      resp.status(400).json("error fetching medicines");
    }
  });
};
