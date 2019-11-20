// Declarations and Imports
var express = require("express");
var app = express();
var session = require("express-session");
var uuid = require("uuid/v4");
var cors = require("cors");
var cookieParser = require("cookie-parser");
var dbConnection = require("./dbConnection");
var runAPIS = require('./API/index')
//// MiddleWare
app.use(express.json());
app.use(
  session({
    genid:uuid,
    secret: "LMS Project",
    resave: false
  })
);
runAPIS(app);
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:4200"
  })
);
dbConnection();

app.get("/", (req, resp) => {
  resp.send("LMS IS CREATED");
});
//// Authentication
function Authenticate(req, resp, next) {
  if (req.url === "/signup" || req.url === "/addmedecine"||req.url==="/confirmsignup") {
    next();
  } else {
    if (req.session.user && req.cookies["connect.sid"]) {
      next();
    } else {
      resp.json({ message: "authentication failed" });
    }
  }
}
    
 app.use(Authenticate);

//localhost:9090/
const port = process.env.PORT||3000
app.listen(port,()=>{
  console.log(`Started up at port ${port}`);
});
