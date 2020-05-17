var mongoose = require("mongoose");
var patientModel = require("../../Models/MedicalModels/patient.model");
var MedecinesModel = require("../../Models/MedicalModels/medicines.model");

module.exports = function createPatientsAPIS(app) {
  app.get("/getpatients", async (req, resp) => {
    try {
      let patients = await patientModel.find({});
      resp.status(200).send(patients);
    } catch (err) {
      resp.status(400).send("error in getting patients");
    }
  });
  //get patient by ID
  app.post("/getpatient", async (req, resp) => {
    try {
      const { p_id } = req.body;
      let patients = await patientModel.find({ _id: p_id });
      resp.status(200).send(patients[0]);
    } catch (err) {
      resp.status(400).send("check patient ID");
    }
  });

  app.post("/removepatient", async (req, resp) => {
    try {
      const { p_id } = req.body;
      let result = await patientModel.remove({ _id: p_id });
      resp.status(200).json(result);
    } catch (err) {
      resp.status(400).send("error in removing Patient");
    }
  });

  app.get("/removeallpatients", async (req, resp) => {
    let output = await patientModel.remove({});
    resp.json({ message: "success", result: output });
  });



  app.put(`/editmedicine/:id`, async (req, resp) => {
    try {
      const { id } = req.params;
      patientModel.findOne({ _id: id }, function (err, foundObject) {
        if (err) {
          resp.status(500).json("error 1");
        } else {
          if (!foundObject) {
            resp.status(404).send();
          } else {
            if (req.body.firstName) {
              foundObject.firstName = req.body.firstName;
            }
            if (req.body.lastName) {
              foundObject.lastName = req.body.lastName;
            }
            if (req.body.email) {
              foundObject.email = req.body.email;
            }
            if (req.body.password) {
              foundObject.password = req.body.password;
            }
            if (req.body.phone) {
              foundObject.phone = req.body.phone;
            }
            if (req.body.gender) {
              foundObject.gender = req.body.gender;
            }
            if (req.body.date) {
              foundObject.date = req.body.date;
            }
            if (req.body.location) {
              foundObject.location = req.body.location;
            }
            if (req.body.snn) {
              foundObject.snn = req.body.snn;
            }
            if (req.body.medicines) {
              foundObject.medicines = req.body.medicines;
            }
            foundObject.save(function (err, updateObject) {
              if (err) {
                resp.status(500).send();
              } else {
                resp.send(updateObject);
              }
            });
          }
        }
      });
    } catch (err) { }
  });
  // app.post("/updatepatient", async (req, resp) => {
  //   try {
  //     const {
  //       p_id,
  //       firstName,
  //       lastName,
  //       email,
  //       password,
  //       phone,
  //       gender,
  //       location,
  //       date,
  //       medicines: m_id
  //     } = req.body;

  //     let output = await patientModel.findOneAndUpdate(
  //       { _id: p_id },
  //       {
  //         firstName,
  //         lastName,
  //         email,
  //         password,
  //         phone,
  //         gender,
  //         location,
  //         date,
  //         m_id
  //       }
  //     );
  //     await output.save();
  //     resp.status(200).json(output);
  //   } catch (err) {
  //     resp.status(400).json("error in editing patient");
  //   }
  // });
};
