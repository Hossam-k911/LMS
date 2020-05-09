var mongoose = require("mongoose");
var ResultModel = require("../../Models/MedicalModels/results.model")
module.exports = function (app) {

    app.post("/addfile", async (req, resp) => {
        try {
            const { res_id, file_id } = req.body;
            let SelectedResults = await ResultModel.findOne({ _id: res_id });
            SelectedResults.result_file_id = file_id;
            await SelectedResults.save();
            resp.status(200).json({ SelectedResults });
        } catch (err) {
            resp.status(400).json(" error  ");
        }
    });
    app.get("/getreqs", async (req, resp) => {
        let request = await ResultModel.find({});
        resp.status(200).json(request);
    });



};
