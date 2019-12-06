var mongoose = require('mongoose')

var MedecinesModel = new mongoose.model('Medicines',{
    _id:mongoose.Schema.Types.ObjectId,
    medicineName:String,
    medicinePrice:String,
    medicineDescription:String,
    medicineQuantity:Number,

    patient:{ type: mongoose.Schema.Types.ObjectId, ref: 'Patients'},
})
module.exports = MedecinesModel