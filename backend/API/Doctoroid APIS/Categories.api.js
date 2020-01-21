var mongoose = require("mongoose");
var CategoriesModel = require("../../Models/MedicalModels/Categories.model");
module.exports = function(app) {
  app.post("/addcategory", async (req, resp) => {
    try {
      const { category_title ,category_imgLink} = req.body;
      let Category = new CategoriesModel({
          _id:mongoose.Types.ObjectId(),
          category_title,category_imgLink
      });
      await Category.save();
      resp.status(200).json(Category);
    } catch (err) {
        resp.status(400).json("error adding Category");
    }
  });
};
