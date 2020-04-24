function RunAPIS(app) {
    require('./general APIS/patient.api')(app)
    require('./general APIS/medecine.api')(app)
    require('./Doctoroid APIS/Register.api')(app)
    require('./Doctoroid APIS/Authentication.apipi')(app)
    require('./general APIS/hospital.api')(app)
    require('./general APIS/Categories.api')(app)
    require('./Dashboard APIS/AdminAuth.api')(app)
    require('./general APIS/Requests.api')(app)



}
module.exports = RunAPIS