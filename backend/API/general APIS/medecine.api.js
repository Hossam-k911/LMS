var mongoose = require("mongoose");
var patientModel = require("../../Models/MedicalModels/patient.model");
var medicinesModel = require("../../Models/MedicalModels/medicines.model");

module.exports = function createPatientsAPIS(app) {
  app.post("/addmedicine", async (req, resp) => {
    try {
      const {
        medicine_Name,
        medicine_Price,
        medicine_Description,
        medicine_Quantity
      } = req.body;
      let medicine = new medicinesModel({
        _id: mongoose.Types.ObjectId(),
        medicine_Name,
        medicine_Price,
        medicine_Description,
        medicine_Quantity
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
  app.post("/addmedecinetopatient", async (req, resp) => {
    try {
      const { p_id, m_id } = req.body;
      let medicine = await medicinesModel.findOne({ _id: m_id });
      if (medicine) {
        let SelectedPatient = await patientModel.findOne({ _id: p_id });
        if (SelectedPatient) {
          SelectedPatient.medicines.push(m_id);
          SelectedPatient.medicines_name.push(medicine.medicine_Name);

        }
        await SelectedPatient.save();
        resp.status(200).json(SelectedPatient);
      }


    } catch (err) {
      resp.status(400).send("error in Updating Medicines");
    }
  });
};
