var mongoose = require("mongoose");
var CategoriesModel = require("../../Models/MedicalModels/Categories.model");
module.exports = function(app) {
  app.post("/addcategory", async (req, resp) => {
    try {
      const { category_title, category_imgLink } = req.body;
      let Category = new CategoriesModel({
        _id: mongoose.Types.ObjectId(),
        category_title,
        category_imgLink
      });
      await Category.save();
      resp.status(200).json(Category);
    } catch (err) {
      resp.status(400).json("error adding Category");
    }
  });

  app.get("/listcategories", async (req, resp) => {
    let categories = await CategoriesModel.find({});
    resp.json(categories);
  });
  app.post('/tests',async (req,resp)=>{
      try{
        const{cat_id,/*test_id,*/test_title,test_period,test_price,test_description}=req.body;
        let Selectedcategory = await CategoriesModel.findOne({_id:cat_id})
        if(Selectedcategory){
            // let test = await category.category_medical_tests.findIndex(p=>p.test_id==test_id);
            Selectedcategory.category_medical_tests.push({test_title,test_period,test_price,test_description});
            
        }
         await Selectedcategory.save();
        resp.status(200).json(Selectedcategory)
      }
      catch(err){
        resp.status(400).json("error adding Tests");

      }
  })
};
