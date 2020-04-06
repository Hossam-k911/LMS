// Declarations and Imports
var express = require("express");
require("dotenv").config();
var session = require("express-session");
var uuid = require("uuid/v4");
var cors = require("cors");
var app = express();
var cookieParser = require("cookie-parser");
var dbConnection = require("./dbConnection");
var runAPIS = require("./API/index");
const jwt = require("jsonwebtoken");

//// MiddleWare
app.use(cors());
app.use(express.json());
app.use(
  session({
    genid: uuid,
    secret: "LMS Project",
    resave: false,
    saveUninitialized: true
  })
);
app.options("*", cors());
/*app.use(cors({
  'allowedHeaders': ['sessionId', 'Content-Type'],
  'exposedHeaders': ['sessionId'],
  origin: "http://localhost:4200",
  'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
  'preflightContinue': false
}));*/

/*app.options("/*", function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
  res.sendStatus(200);
  next();
});*/

app.all('*', function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});










// app.use(
//   cors(
//     {
//       allowedHeaders: "Access-Control-Allow-Origin",
//       credentials: true,
//       origin: "http://localhost:4200",

//       // allowedHeaders: true
//     }
//   )
// );
// Add headers
// app.use(function (req, res, next) {

//   // Website you wish to allow to connect
//   res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');

//   // Request methods you wish to allow
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

//   // Request headers you wish to allow
//   res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

//   // Set to true if you need the website to include cookies in the requests sent
//   // to the API (e.g. in case you use sessions)
//   res.setHeader('Access-Control-Allow-Credentials', true);

//   // Pass to next layer of middleware
//   next();
// });
// app.use(function (req, resp, next) {
//   resp.header("Access-Control-Allow-Origin", "*");
//   resp.header("Access-Control-Allow-Headers", "Origin, X-Requested-With,Content-Type,Accept");
//   resp.headers('Access-Control-Allow-Methods', 'GET,POST,OPTIONS,DELETE,PUT');
//   next();
// })

app.use(cookieParser());

//// Authentication

function Authenticate(req, resp, next) {
  if (
    req.url === "/signup" ||
    req.url === "/signin" ||
    req.url === "/" ||
    req.url === "/dashboard/signin"
  ) {
    next();
  } else {
    const token = req.header("x-auth-token");
    if (!token) return resp.status(401).send("Access Denied");
    try {
      const verified = jwt.verify(token, process.env.jwtPrivateKey);
      req.user = verified;
      next();
    } catch (err) {
      resp.status(400).send("Invalid Token");
    }
  }
}

dbConnection();
// app.use(Authenticate);
runAPIS(app);

app.get("/", (req, resp) => {
  resp.send("LMS IS CREATED .............");
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Started up at port ${port}`);
});
