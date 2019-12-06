var mongoose = require("mongoose");

var PatientsModel = new mongoose.model("Patients", {
  _id: mongoose.Schema.Types.ObjectId,
  firstName: { type: String },
  lastName: { type: String },
  email: { type: String, require: true },
  phone: { type: String },
  password: { type: String, require: true },
  gender: { type: String },
  location: { type: String },
  date: { type: String },
  confirm: { type: String, default: false },
  medicines: [{ type: mongoose.Schema.Types.ObjectId, ref: "Medicines" }]
});
module.exports = PatientsModel;
