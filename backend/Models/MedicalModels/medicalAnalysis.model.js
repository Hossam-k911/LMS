var mongoose = require("mongoose");
let MedicalType = new mongoose.Schema( {
Hematology:{
CBC ,
HB ,
TotalWBC_Count,
PlateletCountBleedingTime, 
ClottingTime,
"BloodGroup[ABO]":{},
RhType,
"ESR [Prefer to fast before the test 6-8 hours]":{},
ProthrombinTime,
APTT
},
KidneyFunctionsTests:{},
LiverFunctionsTests:{},
LipidProfile:{},
BloodGlucose:{},
Microbiology:{},
Thyroid:{},
HepatitisMarkers:{},
Serology:{},
HeartTests:{},
"CA_19.9":{},
Semen:{}
});


let MedicalAnalysisModel = new mongoose.Schema('MedicalAnalysis',{
    _id:mongoose.Schema.Types.ObjectId,
    medical_analysis_name:String,
    medical_analysis_desc:String,
    medical_analysis_require:String,
    medical_analysis_price:Number,
    medical_analysis_period:Number,
    medical_analysis_type:[{type:MedicalType}]
})
module.exports = MedicalAnalysisModel