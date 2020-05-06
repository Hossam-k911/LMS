var mongoose = require("mongoose");
let ResultsModel = new mongoose.model("Requests", {
    _id: mongoose.Schema.Types.ObjectId,
    files: { type: Array }
});
module.exports = ResultsModel;
