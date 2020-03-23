var mongoose = require("mongoose");
let RequestsModel = new mongoose.model("Requests", {
  _id: mongoose.Schema.Types.ObjectId,

  req_status: { type: String, require: true },
  req_time: { type: String, require: true },
  req_date: { type: String, require: true },
  req_p_id: { type: String, require: true },
  req_p_name: { type: String, require: true },
  req_p_phone: { type: String },
  req_answers: [{ type: String, require: true }],
  req_test: { type: String, require: true },
  req_notes: { type: String },
  req_category: { type: String }

});
module.exports = RequestsModel;
