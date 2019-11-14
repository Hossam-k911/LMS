 function RunAPIS(app){
    require('./MedicalAPIS/patient.api')(app)
    require('./MedicalAPIS/medecine.api')(app)
}
module.exports = RunAPIS