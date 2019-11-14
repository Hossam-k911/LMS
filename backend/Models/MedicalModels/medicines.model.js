var mongoose = require('mongoose')

var MedecinesModel = new mongoose.model('Medicines',{
    _id:mongoose.Schema.Types.ObjectId,
    medicine_name:String,
    medicine_price:String,
    medicine_description:String,
    medicine_quantity:Number,

    patient: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Patients' }],
    // doctors: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctors' }
})
module.exports = MedecinesModel