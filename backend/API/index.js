 function RunAPIS(app){
    require('./general APIS/patient.api')(app)
    require('./general APIS/medecine.api')(app)
    require('./Doctoroid APIS/Register.api')(app)
    require('./general APIS/Authentication.api')(app)
    require('./general APIS/hospital.api')(app)
    

}
module.exports = RunAPIS