var mongoose = require("mongoose");
let ResultsModel = new mongoose.model("Results", {
    _id: mongoose.Schema.Types.ObjectId,
    accepted_requests: { type: Array }
});
module.exports = ResultsModel;
