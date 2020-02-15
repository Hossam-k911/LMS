var mongoose = require("mongoose");

let CategoriesModel = new mongoose.model("Categories", {
    _id: mongoose.Schema.Types.ObjectId,
    category_title : String,
    category_imgLink: String,
    category_medical_tests:[
      {
        // test_id:Number,
        test_title:String,
        test_period:Number,
        test_price:Number,
        test_questions:[{type:String}],
        test_description:String
      }
    ]
    
  });
module.exports = CategoriesModel