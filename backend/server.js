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

// app.set('view engine', 'ejs');
//// MiddleWare
app.use(cors());
app.options("*", cors(),
  app.use(Authenticate));


app.use(methodOverride('_method'));
app.use(express.json());
app.use(
  session({
    genid: uuid,
    secret: "LMS Project",
    resave: false,
    saveUninitialized: true
  })
);
function Authenticate(req, resp, next) {
  if (
    req.url === "/signup" ||
    req.url === "/signin" ||
    req.url === "/" ||
    req.url === "/dashboard/signin"
  ) {
    next();
  } else {
    var token = req.header("x-auth-token");
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

app.all('*', function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");

  next();
});



app.use(cookieParser());

//// Authentication

// function Authenticate(req, resp, next) {
//   if (
//     req.url === "/signup" ||
//     req.url === "/signin" ||
//     req.url === "/" ||
//     req.url === "/dashboard/signin"
//   ) {
//     next();
//   } else {
//     const token = req.header("x-auth-token");
//     if (!token) return resp.status(401).send("Access Denied");
//     try {
//       const verified = jwt.verify(token, process.env.jwtPrivateKey);
//       req.user = verified;
//       next();
//     } catch (err) {
//       resp.status(400).send("Invalid Token");
//     }
//   }
// }

dbConnection();
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
  resp.send("LMS IS CREATED .............");
  // resp.render('index');
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
