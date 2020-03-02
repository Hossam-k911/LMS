var mongoose = require("mongoose");
var RequestsModel = require("../../Models/MedicalModels/Requests.model");
var CategoriesModel = require("../../Models/MedicalModels/Categories.model");
var PatientsModel = require("../../Models/MedicalModels/patient.model");
module.exports = function(app) {
  app.post("/addreq", async (req, resp) => {
    try {
      const {
        c_id,
        t_id,
        req_status,
        req_time,
        req_date,
        req_answers,
        req_test,
        req_p_id,
        req_p_name
      } = req.body;
      let Request = new RequestsModel({
        _id: mongoose.Types.ObjectId(),
        req_status,
        req_time,
        req_date,
        req_answers,
        req_test,
        req_p_id,
        req_p_name
      });
      let Selectedcategory = await CategoriesModel.findOne({ _id: c_id });

      let SelectedTest = Selectedcategory.category_medical_tests[0];

      if (SelectedTest.id == t_id) {
        Request.req_test = SelectedTest.test_title;
      } else {
        resp.status(400).json("check test ID");
      }

      await Request.save();

      let SelectedPatient = await PatientsModel.findOne({ _id: req_p_id });
      if (SelectedPatient) {
        Request.req_p_name =
          SelectedPatient.firstName + " " + SelectedPatient.lastName;
        await Request.save();
        SelectedPatient.requests.push(Request.id);
        await SelectedPatient.save();
      }

      resp.status(200).json(Request);
    } catch (err) {
      resp.status(400).json(" error requesting ");
    }
  });

  app.get("/getreq", async (req, resp) => {
    let Req = await RequestsModel.find({});
    resp.json(Req);
  });

  app.post("/patientreq", async (req, resp) => {
    try {
      const { p_id } = req.body;
      let SelectedPatient = await PatientsModel.findOne({ _id: p_id });
      let requests = SelectedPatient.requests;
      resp.status(200).json({ requests });
    } catch (err) {
      resp.status(400).json(" error getting requests for this Patient ");
    }
  });
  app.post("/reqpatientinfo", async (req, resp) => {
    try {
      const { req_id } = req.body;
      let SelectedRequest = await RequestsModel.findOne({ _id: req_id });
      if (SelectedRequest) {
        let p_id = SelectedRequest.req_p_id;
        let SelectedPatient = await PatientsModel.findOne({ _id: p_id });
        resp.status(200).json(SelectedPatient);
      }
    } catch (err) {
      resp.status(400).json(" error getting patient of this ");
    }
  });
  app.put("/editreq", async (req, resp) => {
    try {
      const { req_id } = req.body;
      RequestsModel.findOne({ _id: req_id }, function(err, foundObject) {
        if (err) {
          resp.status(500).json("error 1");
        } else {
          if (req.body.req_status) {
            foundObject.req_status = req.body.req_status;
          }
          if (req.body.req_time) {
            foundObject.req_time = req.body.req_time;
          }
          if (req.body.req_date) {
            foundObject.req.date = req.body.req.date;
          }
          if (req.body.req_answers) {
            foundObject.req.answers = req.body.req.answers;
          }
          foundObject.save(function(err, updateObject) {
            if (err) {
              resp.status(500).send();
            } else {
              resp.send(updateObject);
            }
          });
        }
      });
    } catch (err) {}
  });
};
