var mongoose = require('mongoose')
let RequestsModel = new mongoose.model('Requests',{
    _id:mongoose.Schema.Types.ObjectId,

    req_status:{type:String,require:true},
    req_time:{type:String,require:true},
    req_date:{type:String,require:true},
    req_answers:[{type:String,require:true}],
    req_test:{type:String,require:true},

})
module.exports  = RequestsModel