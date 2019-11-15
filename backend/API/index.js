 function RunAPIS(app){
    require('./MedicalAPIS/patient.api')(app)
    require('./MedicalAPIS/medecine.api')(app)
    require('./Doctoroid APIS/Patients.api')(app)
    // require('./ /Patients.api')(app)
    // require('./Doctoroid APIS/Patients.api')(app)


}
module.exports = RunAPIS