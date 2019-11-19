var mongoose = require('mongoose')

var PatientsModel = new mongoose.model('Patients',{
    _id:mongoose.Schema.Types.ObjectId,
    mob_id:String,
    firstName:{type:String},
    lastName:{type:String},
    email:{type:String ,require:true},
    phone:{type:String},
    password:{type:String,require:true},
    gender:{type:String},
    location:{type:String},
    date:{type:String}
    // medicines: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Medicines' }],
    // doctors: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Doctors' }]

})
module.exports = PatientsModel