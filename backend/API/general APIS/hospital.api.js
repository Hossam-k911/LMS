var mongoose = require("mongoose");
var HospitalModel = require("../../Models/MedicalModels/hospital.model");
module.exports = function(app) {
  app.post("/hospitaldata", async (req, resp) => {
    try {
      const {
        hospital_name,
        hospital_location,
        hospital_phone,
        hospital_website,
        hospital_facebook,
        hospital_email,
        hospital_generalManager,
        hospital_adminstratonManager,
        hospital_itManager,
        hospital_MarketingManager,
        hospital_PurchasingManager
      } = req.body;
      let hospital = new HospitalModel({
        _id: mongoose.Types.ObjectId(),
        hospital_name,
        hospital_location,
        hospital_phone,
        hospital_website,
        hospital_facebook,
        hospital_email,
        hospital_generalManager,
        hospital_adminstratonManager,
        hospital_itManager,
        hospital_MarketingManager,
        hospital_PurchasingManager
      });
      await hospital.save();
      resp.json({message:"success",hospital})
    } catch (err) {
      resp.json({message:"error "})
      
    }
  });

  app.get('/hospitalinfo',async(req,resp)=>{
    let hospital = await HospitalModel.find({});
    resp.json({hospital});
  })
};
