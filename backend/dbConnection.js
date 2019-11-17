// var mongoose = require("mongoose");
// //  require('./.env/config')
// module.exports = function() {
//   mongoose.Promise = global.Promise;
//   mongoose.connect(
//      process.env.MONGODB_URI
//       ,
//     { useUnifiedTopology: true, useNewUrlParser: true }
//   );
// };
// //"mongodb+srv://LMS_db:123@cluster0-2uup7.mongodb.net/lms?retryWrites=true&w=majority"
require('dotenv').config();

const mongoose = require("mongoose");

module.exports = function dbConnection() {
  mongoose.Promise = global.Promise;
  mongoose.connect(process.env.MONGODB_URI,  {useNewUrlParser: true ,useUnifiedTopology: true, useCreateIndex: true ,
    auth: {
      user: process.env.MONGO_USER,
      password: process.env.MONGO_PASSWORD
    }
  })
    .then(db => console.log(`DB is connected`))
    .catch(err => console.error(err));
};
