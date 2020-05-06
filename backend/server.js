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
const multer = require("multer")
const bodyParser = require("body-parser")
const Grid = require('gridfs-stream');
const path = require("path");
const crypto = require("crypto");
const GridFsStorage = require("multer-gridfs-storage");
const methodOverride = require('method-override');
const mongoose = require("mongoose");

app.use(methodOverride('_method'));
app.set('view engine', 'ejs');
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

// dbConnection();
// app.use(Authenticate);
runAPIS(app);


const mongoURI = "mongodb+srv://LMS_db:123@cluster0-2uup7.mongodb.net/test?retryWrites=true&w=majority"

const conn = mongoose.createConnection(mongoURI);
let gfs;

conn.once('open', () => {
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection('uploads');
})


const storage = new GridFsStorage({
  url: mongoURI,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const filename = buf.toString('hex') + path.extname(file.originalname);
        const fileInfo = {
          filename: filename,
          bucketName: 'uploads'
        };
        resolve(fileInfo);
      });
    });
  }
});
const upload = multer({ storage });


app.get("/", (req, resp) => {
  // resp.send("LMS IS CREATED .............");
  resp.render('index');
});

app.post('/upload', upload.single('file'), (req, resp) => {


  resp.json({ file: req.file });

})
app.get('/files', (req, resp) => {
  gfs.files.find().toArray((err, files) => {
    if (!files || files.length === 0) {
      return resp.status(404).json({
        err: 'No files '
      });
    }
    return resp.json(files);
  })
})
app.delete('/delfile/:id', (req, resp) => {
  gfs.remove({ _id: req.params.id, root: 'uploads' }, (err, gridStore) => {
    if (err) {
      return resp.status(404).json({ err: err });
    }
  })
  return resp.json("success");
})



const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Started up at port ${port}`);
});
