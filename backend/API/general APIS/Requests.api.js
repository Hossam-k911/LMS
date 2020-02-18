var mongoose = require("mongoose");
var RequestsModel = require("../../Models/MedicalModels/Requests.model");
var CategoriesModel = require("../../Models/MedicalModels/Categories.model");
var PatientsModel = require("../../Models/MedicalModels/patient.model")
module.exports = function(app) {
  app.post("/addreq", async (req, resp) => {
    try {
      const { c_id, t_id, req_status, req_time, req_answers,req_test,p_id} = req.body;
      let Request = new RequestsModel({
        _id: mongoose.Types.ObjectId(),
        req_status,
        req_time,
        req_answers,req_test
      });
      let Selectedcategory = await CategoriesModel.findOne({ _id: c_id });
      // let SelectedTest = await Selectedcategory.category_medical_tests[0].findOne({
      //   _id: t_id
      // });

      // let SelectedTest = Selectedcategory.category_medical_tests[0].id;
       let SelectedTest = Selectedcategory.category_medical_tests[0];

      if (SelectedTest.id == t_id) {
      Request.req_test = SelectedTest.test_title;
      }else{
      resp.status(400).json("check test ID");

      }

      await Request.save();
      
      let SelectedPatient = await PatientsModel.findOne({ _id: p_id });
     SelectedPatient.requests.push(Request.id)
    await SelectedPatient .save();


    //    let selectedPatient = await PatientsModel.findOne({_id:p_id})
    //   // let selectedPatient = await PatientsModel.findOneAndUpdate({_id:p_id},{requests:Request.id})
    //   let output =  selectedPatient.requests.push(Request.id);
    // //   await  output.save();
    // await output.save()


      resp.status(200).json(Request);
      
    } catch (err) {
      resp.status(400).json(" error requesting ");
    }
  });

  app.get("/getreq", async (req, resp) => {
    let Req = await RequestsModel.find({});
    resp.json(Req);
  });
  
app.post("/addreqtopatient", async (req, resp) => {
  try {
    const { p_id, req_id } = req.body;
    let SelectedPatient = await PatientsModel.findOne({ _id: p_id });
     SelectedPatient.requests.push(req_id)
    await SelectedPatient .save();
    resp.status(200).json(  SelectedPatient);
  } catch (err) {
    resp.status(400).send("error in Updating el 5ra");
  }
});
};

