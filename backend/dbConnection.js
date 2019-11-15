var mongoose = require('mongoose')


module.exports = function (){
    mongoose.connect('mongodb+srv://LMS_db:123@cluster0-2uup7.mongodb.net/test?retryWrites=true&w=majority',{ useUnifiedTopology: true ,useNewUrlParser:true})
}