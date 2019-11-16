var mongoose = require('mongoose')


module.exports = function (){
    mongoose.Promise = global.Promise;
    mongoose.connect(process.env.MONGODB_URI||'mongodb+srv://LMS_db:123@cluster0-2uup7.mongodb.net/lms?retryWrites=true&w=majority',{ useUnifiedTopology: true ,useNewUrlParser:true})
}
