var mongoose = require('mongoose')

var PatientsModel = new mongoose.model('Patients',{
    _id:mongoose.Schema.Types.ObjectId,
    patient_firstName:{type:String},
    patient_lastName:{type:String},
    patient_email:{type:String ,require:true},
    patient_phone:{type:String},
    patient_password:{type:String,require:true},
    patient_gender:{type:String},
    patient_location:{type:String},
    patient_date:{type:Date},
    medicines: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Medicines' }],
    // doctors: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Doctors' }]

})
module.exports = PatientsModel