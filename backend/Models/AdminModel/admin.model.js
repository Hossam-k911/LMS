var mongoose = require('mongoose')
var AdminModel = new mongoose.model('Admin',{
    _id:mongoose.Schema.Types.ObjectId,
    email:String,
    password:String
})
module.exports =AdminModel