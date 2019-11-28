 function RunAPIS(app){
    require('./general APIS/patient.api')(app)
    require('./general APIS/medecine.api')(app)
    require('./Doctoroid APIS/Register.api')(app)
    require('./general APIS/Auth.api')(app)
    require('./general APIS/hospital.api')(app)

    // require('./ /Patients.api')(app)
    // require('./Doctoroid APIS/Patients.api')(app)


}
module.exports = RunAPIS