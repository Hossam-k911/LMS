var mongoose = require("mongoose");
var ResultModel = require("../../Models/MedicalModels/results.model")
var lodash = require('lodash')
module.exports = function (app) {

    app.post("/addfile", async (req, resp) => {
        try {
            const { res_id, file_id, file_name } = req.body;
            let SelectedResults = await ResultModel.findOne({ _id: res_id });
            SelectedResults.result_file_id = file_id;
            SelectedResults.result_file_name = file_name;

            await SelectedResults.save();
            resp.status(200).json(SelectedResults);
        } catch (err) {
            resp.status(400).json(" error  ");
        }
    });
    app.get("/getreqs", async (req, resp) => {
        let request = await ResultModel.find({});
        resp.status(200).json(request);
    });


    app.get("/removeresults", async (req, resp) => {
        await ResultModel.remove({});
        resp.status(200).json("success");

    })
    app.post("/resbyaccid", async (req, resp) => {
        try {
            const { acc_id } = req.body
            let selectedResult = await ResultModel.find({});
            let selectedRequest = lodash.filter(selectedResult, x => x.acc_id === acc_id)
            if (selectedRequest) {
                resp.status(200).json(selectedRequest);
            }
        } catch (err) {
            resp.status(400).json(" error finding accepted requestsssss ");
        }
    })




    app.get("/accepted", async (req, resp) => {
        try {
            let test = await RequestsModel.find({});
            var acceptedTest = lodash.filter(test, x => x.req_status === "Accepted")

            if (acceptedTest) {

                resp.status(200).json(acceptedTest);
            }
        } catch (err) {
            resp.status(400).json(" error finding accepted requests ");

        }
    })
};
