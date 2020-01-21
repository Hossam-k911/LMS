var mongoose = require("mongoose");

let CategoriesModel = new mongoose.model("Categories", {
    _id: mongoose.Schema.Types.ObjectId,
    category_title : String,
    category_imgLink: String,
    
  });
module.exports = CategoriesModel