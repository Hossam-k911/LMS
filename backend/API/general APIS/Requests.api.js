var mongoose = require("mongoose");
var RequestsModel = require("../../Models/MedicalModels/Requests.model");
var CategoriesModel = require("../../Models/MedicalModels/Categories.model");
var PatientsModel = require("../../Models/MedicalModels/patient.model");
var _ = require("lodash");
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
        req_p_name,
        req_p_phone,
        req_notes
      } = req.body;
      let Request = new RequestsModel({
        _id: mongoose.Types.ObjectId(),
        req_status,
        req_time,
        req_date,
        req_answers,
        req_test,
        req_p_id,
        req_p_name,
        req_p_phone,
        req_notes
      });
      let Selectedcategory = await CategoriesModel.findOne({ _id: c_id });

      let SelectedTest = Selectedcategory.category_medical_tests[0];

      if (SelectedTest.id == t_id) {
        Request.req_test = SelectedTest.test_title;
        Request.req_notes = "Empty";
      } else {
        resp.status(400).json("check test ID");
      }

      await Request.save();

      let SelectedPatient = await PatientsModel.findOne({ _id: req_p_id });
      if (SelectedPatient) {
        Request.req_p_name =
          SelectedPatient.firstName + " " + SelectedPatient.lastName;
        Request.req_p_phone = SelectedPatient.phone;
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

  app.post("/delrequest", async (req, resp) => {
    try {
      const { req_id, p_id } = req.body;

      await RequestsModel.remove({ _id: req_id });

      let SelectedRequest = await PatientsModel.findOne({ _id: p_id });
      let arr = [];
      let index = 0;

      for (i = 0; i < SelectedRequest.requests.length; i++) {
        if (SelectedRequest.requests[i] != req_id) {
          arr[index] = SelectedRequest.requests[i];
          index++;
        }
      }
      SelectedRequest.requests = arr;
      await SelectedRequest.save();

      resp.status(200).json("success");
    } catch (err) {
      resp.status(400).send("error .. check request ID ");
    }
  });

  app.get("/delRequests", async (req, resp) => {
    let output = await RequestsModel.remove({});
    resp.json(output);
  });
};
