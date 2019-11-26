var mongoose = require('mongoose')

var MedecinesModel = new mongoose.model('Medicines',{
    _id:mongoose.Schema.Types.ObjectId,
    // med_id:String,
    medicineName:String,
    medicinePrice:String,
    medicineDescription:String,
    medicineQuantity:Number,

    patient:{ type: mongoose.Schema.Types.ObjectId, ref: 'Patients'},
    // doctors: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctors' }
})
module.exports = MedecinesModel